import { Popconfirm, Select, Spin, Table, message } from "antd";
import { ColumnsType, TypeTrailerType } from "../../../types";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "../../../api/axiosInstance";
import { CloseOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { replaceString } from "../../../utils";
import Modal from "../../../components/Panel/Modal";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/Ai";
import { Radio } from "antd";
import { getVehicles, deleteVehicle, GetTrailerTypes } from "../../../api";
import { queryKeys } from "../../../react-query/constants";

const Vehicle: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form, setForm] = useState({ vehicleCardNo: 2605320, plateSerial: "", plateNo1: "", plateNo2: "", activityType: 2, trailerTypeCode: "" });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: +value }));
  };

  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const getAllVehicles = (pageId: number) => {
    return getVehicles(pageId, pageSize);
  };

  const deleteVehicles = async (cardNo: number) => {
    const response = await deleteVehicle(cardNo);
    response.data.status === 0 ? message.success(response.data.message) : message.error(response.data.message);
    return response;
  };

  async function addVehicles() {
    const { vehicleCardNo, plateSerial, plateNo1, plateNo2, activityType, trailerTypeCode } = form;
    const response = await axios.post("/Vehicle/AddVehicle", {
      vehicleCardNo,
      plateNo: +(plateNo2 + "11" + plateNo1),
      plateSerial,
      trailerTypeCode,
      activityType,
    });
    response.data.status === 0 ? message.success(response.data.message) : message.error(response.data.message);
    return response;
  }

  const deleteVehicleMutation = useMutation(deleteVehicles, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.vehicles, pageId]);
    },
  });

  const addVehicleMutation = useMutation(addVehicles, {
    onSuccess: (response) => {
      response.data.status === 0 ? queryClient.prefetchQuery([queryKeys.vehicles, pageId], () => getVehicles(pageId)) : null;
    },
  });

  const { isLoading, isFetching, data: reports } = useQuery([queryKeys.vehicles, pageId], () => getAllVehicles(1));

  const handlePageChange = async (pageId: number) => {
    setPageId(pageId);
    await queryClient.prefetchQuery([queryKeys.vehicles, pageId], () => getVehicles(pageId));
  };

  const handleDelete = async (cardNo: number) => {
    await deleteVehicleMutation.mutate(cardNo);
  };

  const columns: ColumnsType[] = [
    {
      title: "هوشمند ناوگان",
      dataIndex: "cardNo",
      key: "cardNo",
    },
    {
      title: "ناوگان",
      dataIndex: "trailerTypeName",
      key: "trailerTypeName",
    },
    {
      title: "فعالیت",
      dataIndex: "activityTypeName",
      key: "activityTypeName",
    },
    {
      title: "شماره پلاک",
      dataIndex: "plateNo",
      key: "plateNo",
      render: (text: string, obj) => (
        <span>
          <span> {obj.plateSerial}&nbsp;ایران</span>
          <span>&nbsp;{replaceString(text.toString())}</span>
        </span>
      ),
    },
    {
      title: "ناوگان متغیر",
      dataIndex: "dynamicTrailer",
      key: "dynamicTrailer",
      render: (obj: any) => (
        <div dir="rtl">
          <span> {obj.dynamicTrailer ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />}</span>
        </div>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      render: (_, record: any) => (
        <Popconfirm okButtonProps={{ loading: deleteVehicleMutation.isLoading }} title="برای حذف اطمینان دارید؟" onConfirm={() => handleDelete(record.cardNo)}>
          <AiFillDelete className="text-gray-500 text-lg cursor-pointer" />
        </Popconfirm>
      ),
    },
  ];

  const addVehicleHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    await addVehicleMutation.mutate();
    setIsOpenModal(false);
  };

  const getAllTrailerTypes = () => {
    return GetTrailerTypes(form.activityType);
  };

  const { data: trailerType, isLoading: loadingTrailerType, isFetching: fetchingTrailerType, refetch } = useQuery([queryKeys.TrailerType, form.activityType], getAllTrailerTypes, { enabled: false, staleTime: 50000 });

  const trailerTypeCodeHandler = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { name, value } = event.target;
    await setForm((prevForm) => ({ ...prevForm, trailerTypeCode: "", [name]: value }));
    await refetch();
    // await queryClient.prefetchQuery([queryKeys.TrailerType, form.activityType]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 my-1">
        <h1 className="font-bold">ناوگان</h1>
        <div>
          <button
            onClick={async () => {
              setIsOpenModal(true);
              console.log("open modal");
              // refetch();
              await queryClient.prefetchQuery([queryKeys.TrailerType, form.activityType]);
            }}
            className="btn-primary"
          >
            <PlusOutlined />
            <span>افزودن</span>
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={reports?.data?.models ?? []}
        loading={isLoading || isFetching || addVehicleMutation.isLoading || deleteVehicleMutation.isLoading}
        pagination={{
          current: pageId,
          pageSize: pageSize,
          total: reports?.data?.totalRow,
          // showSizeChanger: true,
          // pageSizeOptions: ["1", "2", "3"],
          position: ["bottomCenter"],
          onChange: (page) => {
            handlePageChange(page);
          },
        }}
        rowKey="id"
        bordered
        scroll={{ x: "calc(700px + 50%)" }}
        // locale={{
        //   emptyText: "دیتایی یافت نشد!",
        // }}
      />
      <Modal setIsOpen={setIsOpenModal} isOpen={isOpenModal} title="افزودن ناوگان" size="md">
        <form onSubmit={addVehicleHandler}>
          <div className="mb-4 mt-4">
            <input onChange={handleChangeForm} name="vehicleCardNo" value={form.vehicleCardNo} placeholder="هوشمند ناوگان" type="number" />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-4 font-bold">
              <input value={form.plateSerial} onChange={handleChangeForm} name="plateSerial" type="number" />
              <span>ایران</span>
              <input value={form.plateNo1} onChange={handleChangeForm} name="plateNo1" type="number" />
              <span>ع</span>
              <input value={form.plateNo2} onChange={handleChangeForm} name="plateNo2" type="number" />
            </div>
          </div>
          <div>
            <Radio.Group value={form.activityType} onChange={trailerTypeCodeHandler} name="activityType">
              <Radio value={1}>باری</Radio>
              <Radio value={2}>مسافری</Radio>
            </Radio.Group>
          </div>
          <div className="my-4">
            <Select onChange={(i) => setForm((prevForm) => ({ ...prevForm, trailerTypeCode: i }))} value={form.trailerTypeCode} notFoundContent={loadingTrailerType || fetchingTrailerType ? <Spin size="small" /> : null} loading={loadingTrailerType || fetchingTrailerType} className="!w-full">
              {!loadingTrailerType &&
                !fetchingTrailerType &&
                trailerType?.data.data.map((item: TypeTrailerType) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="text-left">
            <button className="btn-secondary">ارسال</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Vehicle;

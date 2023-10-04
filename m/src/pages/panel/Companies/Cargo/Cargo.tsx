import { Breadcrumb, Table, Typography } from "antd";
import { GetCargoCompanies } from "../../../../api/index";
import { useQuery, useQueryClient } from "react-query";
import { ColumnsType } from "../../../../types";
import { useState } from "react";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { queryKeys } from "../../../../react-query/constants";

export const Cargo = () => {
  const queryClient = useQueryClient();
  // const [showFullAddress, setShowFullAddress] = useState<boolean>(false);
  const [name, setName] = useState<string>("محمد");
  const [pageId, setPageId] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const columns: ColumnsType[] = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "استان",
      dataIndex: "stateName",
      key: "stateName",
    },
    {
      title: "شهر",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "تلفن",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "فکس",
      dataIndex: "fax",
      key: "fax",
    },
    {
      title: "نام کاربری",
      dataIndex: "nationalCode",
      key: "nationalCode",
    },
    {
      title: "کد شرکت",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "کد پستی",
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "شعبه",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "وضعیت",
      dataIndex: "active",
      key: "active",
      render: (obj: any) => (
        <div dir="rtl">
          <span> {obj.dynamicTrailer ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />}</span>
        </div>
      ),
    },
    {
      title: "نوع فعالیت",
      dataIndex: "activityType",
      key: "activityType",
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "address",
      render: (text: string) => (
        <div>
          <div className="flex">
            <Typography.Text
            // ellipsis={!showFullAddress}
            >
              {text}
            </Typography.Text>
          </div>
          {/* <span onClick={() => setShowFullAddress(true)} className="text-xs text-blue-500 cursor-pointer">
            نمایش بیشتر
          </span> */}
        </div>
      ),
    },
  ];
  const fetchCompanies = (pageId: number, pageSize: number = 10, name: any = null) => {
    return GetCargoCompanies(pageId, pageSize, name);
  };
  const {
    data: companies,
    isLoading,
    isFetching,
  } = useQuery([queryKeys.CargoCompanies, pageId], () => fetchCompanies(1), {
    onSuccess: (response) => {
      console.log(response);
    },
  });
  const handlePageChange = async (pageId: number) => {
    setPageId(pageId);
    await queryClient.prefetchQuery([queryKeys.CargoCompanies, pageId], () => fetchCompanies(pageId));
  };
  const handleFilterSubmit = async (event: any) => {
    event.preventDefault();
    await queryClient.prefetchQuery([queryKeys.CargoCompanies, pageId], () => fetchCompanies(pageId, pageSize, name));
  };
  return (
    <div className="flex flex-col gap-4 mb-4 my-1">
      <div>
        <Breadcrumb
          items={[
            {
              title: "شرکت ها",
            },
            {
              title: "شرکت های باری",
            },
          ]}
        />
      </div>
      <div className="filter">
        <div>
          <form onSubmit={handleFilterSubmit}>
            <div className="grid grid-cols-12 gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام شرکت" className="col-span-2" type="text" />
              <button className="btn-primary w-20 flex justify-center">جستجو</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Table
          loading={isLoading || isFetching}
          dataSource={companies?.models}
          columns={columns}
          pagination={{
            current: pageId,
            pageSize: pageSize,
            total: companies?.totalRow,
            // showSizeChanger: true,
            // pageSizeOptions: ["1", "2", "3"],
            position: ["bottomCenter"],
            onChange: (page) => {
              handlePageChange(page);
            },
          }}
          rowKey="id"
          bordered
          scroll={{ x: "calc(700px + 60%)" }}
        />
      </div>
    </div>
  );
};

import { useState } from "react";

import { UserOutlined, PhoneOutlined, FileOutlined, CheckOutlined } from "@ant-design/icons";

import { useForm } from "react-hook-form";
import Modal from "../../components/Panel/Modal";
import { useQuery } from "react-query";
import axios from "../../api/axiosInstance";
import { Spin } from "antd";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: userInfo, isLoading } = useQuery(
    "user-profile",
    async () => {
      const response = await axios.post("/Users/UserProfile");
      return response.data.data;
    },
    { staleTime: 100000 }
  );

  const handleOpenToggle = () => {
    setIsOpen(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-96 bg-white">
        <Spin size="large" />
      </div>
    );
  } else {
    content = (
      <div className="">
        <div className="flex justify-between items-center mb-4 my-1">
          <h1 className="font-bold">اطلاعات کاربری</h1>

          <div>
            <button onClick={handleOpenToggle} className="btn-primary">
              ویرایش اطلاعات
            </button>
          </div>
        </div>
        <div className="bg-white shadow-xl p-6 md:p-8 rounded-md mt-4 flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-around">
          <div className="flex gap-2 items-center">
            <UserOutlined style={{ fontSize: "20px" }} className="text-gray-500 bg-gray-200 p-3 rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="text-black ">نام و نام خانوادگی</p>
              <p className="font-bold">
                {userInfo?.firstName} {userInfo?.lastName}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-r-0 lg:border-r border-gray-200 pr-0 lg:pr-12">
            <PhoneOutlined style={{ fontSize: "20px" }} className="text-gray-500 bg-gray-200 p-3 rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="text-black ">همراه</p>
              <p className="font-bold">{userInfo?.phoneNumber}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-r-0 lg:border-r border-gray-200 pr-0 lg:pr-12">
            <FileOutlined style={{ fontSize: "20px" }} className="text-gray-500 bg-gray-200 p-3 rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="text-black ">نام کاربری</p>
              <p className="font-bold">{userInfo?.username}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center border-r-0 lg:border-r border-gray-200 pr-0 lg:pr-12">
            <CheckOutlined style={{ fontSize: "20px" }} className="text-gray-500 bg-gray-200 p-3 rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="text-black ">وضعیت</p>
              <p className="font-bold">{userInfo?.active ? "فعال" : "غیرفعال"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {content}

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="ویرایش اطلاعات" size="lg">
        <form className="flex flex-col gap-3 text-right">
          <div>
            <label htmlFor="firstName">نام</label>
            <input disabled={true} type="text" id="firstName" defaultValue={userInfo?.firstName} {...register("firstName")} />
          </div>
          <div>
            <label htmlFor="lastName">نام خانوادگی</label>
            <input disabled={true} type="text" id="lastName" defaultValue={userInfo?.lastName} {...register("lastName")} />
          </div>
          <div>
            <label htmlFor="firstName">شماره گواهی نامه</label>
            <input disabled={true} id="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="phoneNumber">شماره تماس</label>
            <input disabled={true} type="text" id="phoneNumber" defaultValue={userInfo?.phoneNumber} {...register("phoneNumber")} />
          </div>
          <div className="relative">
            <label htmlFor="activity">وضعیت در سازمان</label>
            <select disabled={true} className="appearance-none" name="activity" id="activity">
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
            {/* <ExpandMoreIcon className="absolute left-4 top-[58px] text-gray-400" /> */}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;

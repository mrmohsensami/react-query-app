import { useEffect, useState } from "react";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PhoneIcon from "@mui/icons-material/Phone";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import Spinner from "../../components/Panel/Spinner";
import { useForm } from "react-hook-form";
import Modal from "../../components/Panel/Modal";
// import { editCompanyInfo, getCompanyInfo } from "../../api";
import { toast } from "react-toastify";

import useAxiosFunction from "../../hooks/useAxiosFunction";

const Profile = () => {
  const [companyInfo, error, loadingCompanyInfo, axiosFetchCompanyInfo] = useAxiosFunction();

  const [isOpen, setIsOpen] = useState(false);

  // const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getCompanyInfo = () => {
    const response = axiosFetchCompanyInfo({
      method: "get",
      url: "/Company/GetInfo",
    });
  };

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

  const submitHandler = async (values) => {
    const response = await axiosFetchCompanyInfo({
      url: "/Company/EditInfo",
      requestConfig: {
        id: companyInfo.id,
        telephone: values.telephone.trim(),
        address: values.address.trim(),
        branch: values.branch.trim(),
        postalCode: values.postalCode.trim(),
      },
    });
    setIsOpen(false);
    response.data.status === 0 ? toast.success(response.data.message) : toast.error(response.data.message);
    await getCompanyInfo();
  };

  if (loadingCompanyInfo) {
    content = (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  } else {
    content = (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">اطلاعات شرکت</h1>
          <div>
            <button onClick={handleOpenToggle} className="btn-primary-outlined">
              ویرایش اطلاعات
            </button>
          </div>
        </div>
        <div className="bg-white shadow-xl p-6 md:p-8 rounded-md mt-4 flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
          <div className="flex gap-2 items-center">
            <LocationCityIcon sx={{ fontSize: "30px" }} className="text-primary-500" />

            <div className="flex flex-col gap-2">
              <small className="text-black ">نام شرکت</small>
              <small className="font-bold">{companyInfo?.data?.name}</small>
            </div>
          </div>
          <div className="flex gap-2 items-center lg:border-r border-r-0 border-gray-200 pr- lg:pr-12">
            <EmojiTransportationIcon sx={{ fontSize: "30px" }} className="text-primary-500" />
            <div className="flex flex-col gap-2">
              <small className="text-black ">شعبه</small>
              <small className="font-bold">{companyInfo?.data?.branch}</small>
            </div>
          </div>
          <div className="flex gap-2 items-center lg:border-r border-r-0 border-gray-200 pr- lg:pr-12">
            <PhoneIcon sx={{ fontSize: "30px" }} className="text-primary-500" />
            <div className="flex flex-col gap-2">
              <small className="text-black ">تلفن</small>
              <small className="font-bold">{companyInfo?.data?.telephone}</small>
            </div>
          </div>
          <div className="flex gap-2 items-center lg:border-r border-r-0 border-gray-200 pr- lg:pr-12">
            <EventAvailableIcon sx={{ fontSize: "30px" }} className="text-primary-500" />
            <div className="flex flex-col gap-2">
              <small className="text-black ">کد پستی</small>
              <small className="font-bold">{companyInfo?.data?.postalCode}</small>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return (
    <div>
      {content}

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="ویرایش اطلاعات" size="lg">
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3 text-right">
          <div>
            <label htmlFor="firstName">تلفن</label>
            <input
              type="text"
              id="telephone"
              defaultValue={companyInfo?.data?.telephone}
              {...register("telephone", {
                required: { message: "تلفن ثابت ضروری است", value: true },
                maxLength: {
                  message: "تلفن ثابت حداکثر 11 کاراکتر است ",
                  value: 11,
                },
              })}
            />
            {errors.telephone && <p className="text-sm text-red-600 flex items-center gap-1 mt-2">{errors.telephone.message}</p>}
          </div>
          <div>
            <label htmlFor="firstName">شعبه</label>
            <input id="branch" type="text" defaultValue={companyInfo?.data?.branch} {...register("branch")} />
          </div>
          <div>
            <label htmlFor="phoneNumber">کد پستی</label>
            <input type="text" id="postalCode" defaultValue={companyInfo?.data?.postalCode} {...register("postalCode")} />
          </div>
          <div>
            <label htmlFor="lastName">آدرس</label>
            <input type="text" id="address" defaultValue={companyInfo?.data?.address} {...register("address")} />
          </div>
          <button disabled={isLoading} className="btn-primary">
            {isLoading ? <Spinner size="sm" /> : "ثبت"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;

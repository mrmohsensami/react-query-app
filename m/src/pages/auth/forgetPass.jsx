import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./forgetPass.module.css";
import { Link, useNavigate } from "react-router-dom";
import { RiInformationLine } from "react-icons/ri";
import { toast } from "react-toastify";

import axios from "../../api/axiosInstance";

const forgetPass = () => {
  const [formStep, setFormStep] = useState(1);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const submitHandler = async (values) => {
    switch (formStep) {
      case 1:
        await axios
          .post("/Users/ForgetPass", {
            userName: values.username,
          })
          .then((response) => {
            toast.warning(response.data.message);
          });
        setFormStep(2);
        break;
      case 2:
        await axios
          .post("/Users/ForgetPassVerifyCode", {
            userName: values.username,
            code: values.OTP,
          })
          .then((response) => {
            toast.success(response.data.message);
          });
        setFormStep(3);
        break;
      case 3:
        await axios
          .post("/Users/SetNewPass", {
            userName: values.username,
            code: values.OTP,
            newPassword: values.password,
          })
          .then((response) => {
            toast.success(response.data.message);
          });
        navigate("/");
        break;
      default:
    }
    // await axios
    //   .post("/Users/ForgetPass", {
    //     userName: values.username,
    //   })
    //   .then((response) => {
    //     toast.success(response.data.data);
    //   });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className={`md:px-24 px-8 py-24 lg:px-48 lg:py-24 ${classes.oval}`}>
        <h1 className="mb-12 font-bold">فراموشی رمز عبور</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2 md:w-[440px]">
          {formStep === 1 ? (
            <section>
              <label htmlFor="username">نام کاربری (کد ملی)</label>
              <input
                name="username"
                id="username"
                type="text"
                className="text-center"
                dir="ltr"
                {...register("username", {
                  required: { message: "نام کاربری ضروری است", value: true },
                  maxLength: {
                    message: "نام کاربری حداکثر 12 کاراکتر است ",
                    value: 12,
                  },
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                  <RiInformationLine className="text-xl font-light" /> {errors.username.message}
                </p>
              )}
            </section>
          ) : null}
          {formStep === 2 ? (
            <section>
              <label htmlFor="OTP">کد امنیتی را وارد کنید</label>
              <input
                name="OTP"
                id="OTP"
                type="text"
                className="text-center"
                dir="ltr"
                {...register("OTP", {
                  required: { message: "کد امنیتی وارد نشده است", value: true },
                })}
              />
              {errors.OTP && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                  <RiInformationLine className="text-xl font-light" /> {errors.OTP.message}
                </p>
              )}
            </section>
          ) : null}
          {formStep === 3 ? (
            <section>
              <label htmlFor="password">رمز عبور جدید</label>
              <input
                dir="ltr"
                className={errors.password ? "border border-red-600" : "border border-[#DCDCE5]"}
                {...register("password", {
                  required: { message: " رمز عبور ضروری است", value: true },
                  minLength: {
                    message: "رمز عبور حداقل 6 کاراکتر است ",
                    value: 6,
                  },
                })}
                type="password"
                name="password"
                id="password"
              />
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                  <RiInformationLine className="text-xl font-light" /> {errors.password.message}
                </p>
              )}
              <label htmlFor="password2">تکرار رمز عبور جدید</label>
              <input
                dir="ltr"
                className={errors.password2 ? "border border-red-600" : "border border-[#DCDCE5]"}
                {...register("password2", {
                  required: { message: "تایید رمز عبور  ضروری است", value: true },
                  minLength: {
                    message: "تایید رمز عبور حداقل 6 کاراکتر است ",
                    value: 6,
                  },
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "رمز عبور مطابفت ندارد";
                    }
                  },
                })}
                type="password"
                name="password2"
                id="password2"
              />
              {errors.password2 && (
                <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                  <RiInformationLine className="text-xl font-light" /> {errors.password2.message}
                </p>
              )}
            </section>
          ) : null}
          <button disabled={isSubmitting || !isValid} className="bg-gray-500 w-full text-white rounded-md py-4">
            تایید
          </button>
        </form>

        <Link to="/" className="cursor-pointer text-primary block mt-2 text-sm">
          بازگشت
        </Link>
      </div>
    </div>
  );
};

export default forgetPass;

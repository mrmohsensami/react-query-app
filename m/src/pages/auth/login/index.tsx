import { useForm } from "react-hook-form";
import PublicLayout from "../../../container/PublicLayout";
import { RiInformationLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyOTP from "../../../components/VerifyOTP";
import axios from "../../../api/axiosInstance";
import { Spin, message } from "antd";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const submitHandle = async (values: any) => {
    // console.log(values);
    try {
      const response = await axios.post("/Users/Login", {
        username: values.userName,
        password: values.password,
      });
      // console.log(response);
      if (response.data.status === 0) {
        message.success(response.data.message);
        setShowOTP(true);
        // navigate(`/verify?username=${values.userName}`);
      } else if (response.data.status === 1047) {
        message.error(response.data.message);
        axios
          .post("/Users/ResendCode", {
            username: values.userName,
            type: 4,
          })
          .then((response) => {
            // console.log(response);
          });
        navigate(`/register?formstep=2&phonenumber=${response.data.data.phoneNumber}&username=${values.userName}`);
      } else {
        message.error(response.data.message);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const validateNumber = (value: any) => {
    return /^[0-9]*$/.test(value) || "نام کاربری نامعتبر است";
  };

  return (
    <PublicLayout>
      <div className="">
        <div className="flex flex-col min-h-screen justify-center items-center ">
          <div className="md:bg-background md:px-[60px] pb-[55px] md:w-[560px] rounded-b-lg pt-12">
            {showOTP ? (
              <div>
                <VerifyOTP login={true} username_login={watch("userName")} />
              </div>
            ) : (
              <div>
                <div className="w-full">
                  <img src="./img/vtap.png" className="mx-auto mb-8" />
                </div>
                {/* <p className="md:text-2xl text-center font-bold pb-4 md:pb-4">پنل بازدید فنی</p>
                <p className="md:text-lg text-center text-sm pb-4">برای مدیریت سامانه بازدید فنی وارد پنل شوید</p> */}
                <form onSubmit={handleSubmit(submitHandle)} className="mt-4 ">
                  <div className="flex flex-col mb-4">
                    <label className="text-sm mb-2" htmlFor="userName">
                      نام کاربری
                    </label>
                    <input
                      className={errors.userName ? "border border-red-600" : "border border-[#DCDCE5]"}
                      {...register("userName", {
                        required: { message: "نام کاربری ضروری است", value: true },
                        validate: validateNumber,
                        minLength: {
                          message: "نام کاربری باید حداقل 10 کاراکتر باشد ",
                          value: 10,
                        },
                      })}
                      type="number"
                      name="userName"
                      id="userName"
                    />
                    {errors.userName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                        <RiInformationLine className="text-xl font-light" /> {errors.userName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-2" htmlFor="password">
                      رمز عبور
                    </label>
                    <div className="flex items-center relative">
                      <input
                        className={errors.password ? "border border-red-600" : "border border-[#DCDCE5]"}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        {...register("password", {
                          required: { message: "رمز عبور ضروری است", value: true },
                          minLength: {
                            message: "رمز عبور حداقل 6 کاراکتر باشد ",
                            value: 6,
                          },
                        })}
                      />
                      <div className="absolute left-6 mt-1 cursor-pointer color-[#828282]">{!showPassword ? <FiEyeOff onClick={togglePasswordVisibility} /> : <FiEye onClick={togglePasswordVisibility} />}</div>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                        <RiInformationLine className="text-xl font-light" /> {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center my-4">
                    {/* <div className="flex items-center gap-1">
                      <input className="focus:ring-0" type="checkbox" name="rememberme" id="rememberme" {...register("rememberme")} />
                      <label className="text-xs md:text-sm" htmlFor="rememberme">
                        مرا به خاطر بسپار
                      </label>
                    </div> */}
                    {/* <div className="text-xs md:text-sm">
                      <Link to="/forget-password">فراموشی رمز عبور</Link>
                    </div> */}
                  </div>
                  {/* <Primary disable={!isValid || isSubmitting} title="ورود به پنل" /> */}
                  <button disabled={!isValid || isSubmitting} className="bg-gray-500 w-full rounded-md text-white p-4 md:p-6 flex justify-center">
                    {!isSubmitting ? <span className="text-sm md:text-base"> ورود به پنل </span> : <Spin />}
                  </button>
                </form>
                <div className="flex gap-2 mt-4 text-xs md:text-sm">
                  {/* <p>هنوز ثبت نام نکرده‌ام!</p>
                  <p>
                    <Link className="text-gray" to="/register">
                      ثبت نام
                    </Link>
                  </p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;

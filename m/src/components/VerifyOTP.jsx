import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useLoginMutation } from "../redux/services/authApi";
// import { setCredentials } from "../slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { useLoginUserMutation } from "../redux/services/authApi";
import { useAppDispatch } from "../redux/app/hooks";
import { setUser } from "../redux/features/authSlice";
import axios from "../api/axiosInstance";
import { Spin, message } from "antd";

const VerifyOTP = (props) => {
  const dispatch = useAppDispatch();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [otpCode, setOtpCode] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [searchParams] = useSearchParams();
  const formstep = searchParams.get("formstep");
  const phonenumber = searchParams.get("phonenumber");
  const username = searchParams.get("username");

  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError, isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  // const [login, { isLoading, error }] = useLoginMutation();
  // const dispatch = useDispatch();

  function handleInputChange(e, index) {
    const input = e.target;
    const filledInputIndex = inputRefs.findIndex((ref) => ref.current.value === "");
    if (input.value.length >= 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (input.value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (input.value.length === 1 && index === inputRefs.length - 1) {
      const otpCode = inputRefs.map((ref) => ref.current.value).join("");
      setOtpCode(otpCode);
    }
    if (filledInputIndex === -1) {
      setIsCompleted(true);
    } else {
    }
  }

  const submitHandle = async (event) => {
    event.preventDefault();
    // console.log(otpCode, username, phonenumber);

    if (props.register || phonenumber) {
      try {
        const response = await axios.post("/Users/VerifyPhone", {
          code: otpCode,
          username: props.username || username,
          phoneNumber: props.phone || phonenumber,
        });
        if (response.data.status === 0) {
          message.success(response.data.message);
          navigate("/");
        } else {
          message.error(response.data.message);
          inputRefs.forEach((ref) => (ref.current.value = null));
          inputRefs[0].current.focus();
          setIsCompleted(false);
        }
      } catch (error) {}
    } else if (props.login) {
      // console.log("login");
      // console.log(otpCode, props.login, props.username_login);

      const resLogin = await loginUser({ code: otpCode, username: props.username_login, fcmID: null, deviceInfo: null });
      if (resLogin.data.status === 0) {
        // console.log(resLogin.data.data.token);
        dispatch(setUser({ token: resLogin.data.data.token, refreshToken: resLogin.data.data.refreshToken, userInfo: resLogin.data.data.userInfo }));
        navigate("/profile");
      } else {
        message.error(resLogin.data.message);
        inputRefs.forEach((ref) => (ref.current.value = null));
        inputRefs[0].current.focus();
        setIsCompleted(false);
      }
    }
  };

  const resendCode = () => {
    if (props.login) {
      axios
        .post("/Users/ResendCode", {
          username: props.username_login,
          type: 1,
        })
        .then((response) => {
          message.success(response.data.message);
        });
    } else if (props.register) {
      axios
        .post("/Users/ResendCode", {
          username: props.username,
          type: 4,
        })
        .then((response) => {
          message.success(response.data.message);
        });
    }
    setSeconds(59);
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        // setSeconds(seconds - 1);
        setSeconds((prevTime) => prevTime - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          // setMinutes(minutes - 1);
          setMinutes((prevTime) => prevTime - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  // useEffect(() => {
  //   if (isLoginSuccess) {
  //     console.log(loginData.data.token);
  //     console.log(loginData.data.refreshToken);
  //     console.log(loginData.data.userInfo);
  //     dispatch(setUser({ token: loginData.data.token, refreshToken: loginData.data.refreshToken, userInfo: loginData.data.userInfo }));
  //     // toast.success("User Login Successfully");
  //     // navigate("/dashboard");
  //   }
  // }, [isLoginSuccess]);

  return (
    <div>
      <p className="text-2xl font-bold pb-8">کد امنیتی را وارد کنید</p>
      <div className="text-bold lg:w-[440px] leading-9">
        ما یک کد تایید 6 رقمی برای شماره شما ارسال کردیم.آن را با دقت وارد کنید تا بتوانیم هویت شما را تایید کنیم.{" "}
        {props.register && !(phonenumber || username || formstep) && (
          <div>
            <span>شماره را اشتباه وارد کرده‌ام! </span>
            <span onClick={() => props.click(true)} className="cursor-pointer text-blue-600">
              ویرایش شماره
            </span>
          </div>
        )}
      </div>
      {/* <div className="oval hidden lg:block"></div> */}
      <form onSubmit={submitHandle} className="mt-4 lg:w-[440px]">
        <div className="flex justify-center items-center">
          <div dir="ltr" className="flex gap-4 my-8">
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[0]} onChange={(e) => handleInputChange(e, 0)} />
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[1]} onChange={(e) => handleInputChange(e, 1)} />
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[2]} onChange={(e) => handleInputChange(e, 2)} />
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[3]} onChange={(e) => handleInputChange(e, 3)} />
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[4]} onChange={(e) => handleInputChange(e, 4)} />
            <input type="text" maxLength="1" className="w-8 h-8 md:w-12 md:h-12 text-center border border-gray-300 rounded-md" ref={inputRefs[5]} onChange={(e) => handleInputChange(e, 5)} />
          </div>
        </div>
        {!(phonenumber || username || formstep) && (
          <div className="text-center mb-8">
            {seconds > 0 || minutes > 0 ? (
              <p>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} <span>تا ارسال مجدد کد</span>
              </p>
            ) : (
              <button type="button" onClick={resendCode}>
                ارسال مجدد کد
              </button>
            )}
          </div>
        )}

        <button disabled={!isCompleted || isLoading} className="bg-gray-500 w-full text-white py-5 rounded-md flex justify-center">
          {!isLoading ? <span className="text-sm md:text-base">تایید</span> : <Spin />}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;

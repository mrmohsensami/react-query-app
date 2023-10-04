import React, { useState } from "react";
import classes from "./EditPhone.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editPhone } from "../api";

const EditPhone = ({ phone, username, click }) => {
  const [inputPhone, setInputPhone] = useState(phone);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await editPhone(username, inputPhone);
      if (response.data.status === 0) {
        toast.success(response.data.message);
        click(true);
        // navigate(`/register?formstep=2&phonenumber=${inputPhone}&username=${username}`);
      } else {
        toast.error(response.data.message);
        setInputPhone("");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className={classes.oval}></div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[440px]">
        <label htmlFor="phone">ویرایش تلفن همراه</label>
        <input onChange={(e) => setInputPhone(e.target.value)} name="phone" id="phone" value={inputPhone} type="text" className="text-center" dir="ltr" />
        <small onClick={() => click(true)} className="cursor-pointer text-primary">
          انصراف
        </small>
        <button disabled={isLoading || !inputPhone} className="bg-gray-500 w-full text-white rounded-md py-4">
          تایید
        </button>
      </form>
    </div>
  );
};

export default EditPhone;

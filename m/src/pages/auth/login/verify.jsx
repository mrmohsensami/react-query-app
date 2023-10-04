import logo from "./logo.png";
import Secondary from "../../../components/UI/Button/Secondary";

import Download from "../../../components/Icons/download.png";

import classes from "./index.module.css";

const Verify = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:grid md:grid-cols-12 justify-around items-center h-screen">
        <div className={classes.oval}></div>
        <div className="col-span-10">
          <VerifyOTP />
        </div>
        <div className="col-span-2 hidden md:block">
          <div className="flex flex-col justify-start items-end">
            <div>
              <img className="mb-8" src={logo} />
            </div>
            <Secondary title="دانلود اپلیکیشن وی تپ" icon={Download} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

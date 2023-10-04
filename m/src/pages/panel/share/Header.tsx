import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Dropdown, Avatar, Button } from "antd";
import useQuery from "../../../hooks/useMediaQuery";
import { useLogoutMutation } from "../../../redux/services/authApi";
import { logout } from "../../../redux/features/authSlice";

const Header = ({ click }: any) => {
  const { isMobile } = useQuery();
  // const [darkMode, setDarkMode] = useDarkMode();
  const [logoutUser, { data: logoutData, isLoading: loadingLogout }] = useLogoutMutation();
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const items = [
    {
      label: <Link to="profile">پروفایل</Link>,
      key: "profile",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="change-password">تغییر رمز عبور</Link>,
      key: "change-password",
    },
    {
      type: "divider",
    },
    {
      key: "exit",
      label: loadingLogout ? <small>در حال خارج شدن</small> : <p onClick={logoutHandler}>خروج</p>,
      disabled: loadingLogout,
    },
  ];

  return (
    <div className="bg-white z-999">
      <div>
        <div className="">
          {isMobile ? (
            <div className="flex items-center justify-between p-4">
              <div className="cursor-pointer" onClick={click}>
                <MenuOutlined />
              </div>
              <div className="flex gap-2">
                <Button shape="circle" icon={<MailOutlined />} />
                <Button onClick={logoutHandler} disabled={loadingLogout} shape="circle" icon={<LogoutOutlined />} />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center p-4">
              <div></div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar icon={<UserOutlined />} />
                    <div className="flex flex-col items-start">
                      <p className="text-black font-bold">{loadingLogout ? <small>در حال خارج شدن</small> : `${userInfo?.firstName} ${userInfo?.lastName}`}</p>
                    </div>
                  </div>
                </a>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

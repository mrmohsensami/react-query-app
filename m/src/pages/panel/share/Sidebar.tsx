import { Menu, Drawer, Divider } from "antd";
import { ApartmentOutlined, UserOutlined, WarningOutlined, CarOutlined } from "@ant-design/icons";

import { BsBusFrontFill } from "react-icons/bs";

import useMediaQuery from "../../../hooks/useMediaQuery";
import { NavLink } from "react-router-dom";

import { useState } from "react";

type SidebarProp = {
  visible: boolean;
  handleCloseDrawer: any;
};

const Sidebar = ({ handleCloseDrawer, visible }: SidebarProp) => {
  const [openKeys, setOpenKeys] = useState([]);
  const { isMobile } = useMediaQuery();

  const navigation: any = [
    {
      key: "profile",
      label: <NavLink to="/profile">پروفایل</NavLink>,
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "vehicles",
      label: <NavLink to="/vehicles">ناوگان</NavLink>,
      icon: <BsBusFrontFill />,
    },
    {
      type: "divider",
    },
    {
      key: "companies",
      label: "شرکت ها",
      icon: <ApartmentOutlined />,
      children: [
        {
          key: "companies-cargo",
          label: <NavLink to="/companies-cargo">باری</NavLink>,
        },
        {
          key: "companies-passenger",
          label: <NavLink to="/companies-passenger">مسافری</NavLink>,
        },
      ],
    },
  ];

  const handleOpenChange = (keys: any) => {
    // const newArray = keys.slice(keys.length - 1);
    // console.log(newArray);
    // setOpenKeys(newArray);
    // setOpenKeys(keys.slice(keys.length - 1));
    // const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey);
    // if (navigation.indexOf(latestOpenKey!) === -1) {
    //   setOpenKeys(keys);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
  };

  return (
    <div className={`${!isMobile ? "w-[400px]" : null}`}>
      {isMobile ? null : (
        // <Button type="primary" icon={<MenuOutlined />} onClick={handleMenuClick} />
        <div>
          <div className="bg-gray-100 py-6 h-16">
            <img className="mx-auto" src="../img/vtap.png" />
          </div>
          <Divider style={{ margin: 0 }} />
          <Menu
            triggerSubMenuAction="click"
            mode="inline"
            items={navigation}
            className=""
            // openKeys={openKeys}
            // onOpenChange={handleOpenChange}
          />
        </div>
      )}

      <Drawer
        placement="right" // Open the drawer on the right side
        closable={true}
        onClose={handleCloseDrawer}
        open={visible}
      >
        <div style={{ display: "flex" }}>{/* <Button type="primary" icon={<CloseOutlined />} onClick={handleCloseDrawer} /> */}</div>

        <div>Mobile</div>
      </Drawer>
    </div>
  );
};

export default Sidebar;

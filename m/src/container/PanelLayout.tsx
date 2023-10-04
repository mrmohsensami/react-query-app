import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/panel/share/Header";
import Footer from "../pages/panel/share/Footer";
import Sidebar from "../pages/panel/share/Sidebar";
import Banner from "../pages/panel/share/Banner";

const drawerWidth = 260;

function PanelLayout() {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    setVisible(!visible);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="flex">
        <Sidebar visible={visible} handleCloseDrawer={handleCloseDrawer} />
        <div className="bg-[#e9ecef] w-full min-h-screen">
          <Header click={handleMenuClick} />
          <Banner />

          <div className="p-2 md:p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative">
        <Footer />
      </div>
      {/* </ConfigProvider> */}
    </>
  );
}

export default PanelLayout;

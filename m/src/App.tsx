import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/index.jsx";
import Profile from "./pages/panel/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PanelLayout from "./container/PanelLayout";
import Vehicle from "./pages/panel/vehicles/Vehicle.js";
import ChangePassword from "./pages/panel/ChangePassword";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import { ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR";

import "react-toastify/dist/ReactToastify.css";

import { QueryClientProvider } from "react-query";
import { Cargo } from "./pages/panel/Companies/Cargo/";
import { Passenger } from "./pages/panel/Companies/Passenger/";
import { queryClient } from "./react-query/queryClient";
import theme from "./theme.js";

function App() {
  return (
    <>
      <ConfigProvider theme={theme} locale={fa_IR}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <div className="App">
              <Routes>
                <Route path="/" element={<PublicRoute />}>
                  <Route path="/" element={<Login />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<PanelLayout />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/vehicles" element={<Vehicle />} />
                    <Route path="/companies-cargo" element={<Cargo />} />
                    <Route path="/companies-passenger" element={<Passenger />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                  </Route>
                </Route>
              </Routes>
            </div>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          </QueryClientProvider>
        </Provider>
      </ConfigProvider>
    </>
  );
}

export default App;

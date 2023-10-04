import axios from "./axiosInstance";

const ChangePasswordApi = async (newPassword: string, currentPassword: string) => {
  const data = await axios.post("/Users/ChangePassword", {
    newPassword,
    currentPassword,
  });
  return data;
};

const GetTrailerTypes = async (value: number) => {
  return await axios.get(`/Vehicle/GetTrailerTypes?ActivityType=${value}`);
};

const getVehicles = async (pageIndex: number, pageSize: number = 10) => {
  const { data } = await axios.post("/Vehicle/GetVehicles", {
    paginatedRequest: {
      pageIndex,
      pageSize,
    },
  });
  return data;
};

const deleteVehicle = async (vehicleCardNo: number) => {
  const data = await axios.post("/Vehicle/DeleteVehicle", { vehicleCardNo });
  return data;
};

const GetCargoCompanies = async (pageIndex: number, pageSize: number = 10, name: string | null = null) => {
  const { data } = await axios.post("/Company/GetCargoCompanies", {
    name,
    paginatedRequest: {
      pageIndex,
      pageSize,
    },
  });
  return data.data;
};

export { ChangePasswordApi, getVehicles, deleteVehicle, GetTrailerTypes, GetCargoCompanies };

export interface ColumnsType {
  key: string;
  title: string;
  dataIndex: string;
  render?: (text: string, obj: any) => any;
  sorter?: (text: string, obj: any) => any | undefined;
}
export interface FormValues {
  telephone: number;
  branch: string;
  postalCode: number;
  address: string;
  vehicleCArNo: string;
  plateNo: number;
  plateNo1: number;
  plateNo2: number;
  plateSerial: number;
  trailerTypeCode: number;
  vehicleCardNo: number;
  activityType: 1 | 2;
}
export type TypeTrailerType = {
  name: string;
  code: number;
};

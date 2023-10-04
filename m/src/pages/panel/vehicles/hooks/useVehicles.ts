// import { useQuery, useQueryClient } from "react-query";

// import type { Treatment } from "../../../../../shared/types";
// import axios from "../../../../api/axiosInstance";
// import { queryKeys } from "../../../../react-query/constants";
// import { getVehicles, deleteVehicle, GetTrailerTypes } from "../../../api";

// for when we need a query function for useQuery
// const getAllVehicles = (pageId: number = 1, pageSize: number = 10) => {
//   return getVehicles(pageId, pageSize);
// };

// export function useVehicles(): Treatment[] {
//   // TODO: get data from server via useQuery
//   const fallback = [];
//   const { data = fallback } = useQuery(queryKeys.vehicles, getTreatments);
//   return data;
// }

// export function usePrefetchVehicles(): void {
//   const queryClient = useQueryClient();
//   queryClient.prefetchQuery(queryKeys.vehicles, getAllVehicles);
// }

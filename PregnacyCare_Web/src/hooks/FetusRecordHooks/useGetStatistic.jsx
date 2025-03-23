// src/hooks/useFetchAppointment.js

import { useQuery } from "@tanstack/react-query";
import fetusRecordApi from "../../apis/CallAPIFetusRecord/FetusRecordAPI";
export const useFetchFetusRecordStatistic = (id) => {
  

  return useQuery({
    queryKey: ["fetusStatic",id], // Đặt tên query để React Query có thể theo dõi và refetch khi cần
    queryFn: async () => {
        if (!id) return { data: { fetusWeek: [], weight: [], height: [] } };
      const response = await fetusRecordApi.getFetusRecordStatistics(id);
      return response.data || { fetusWeek: [], weight: [], height: [] };
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Dữ liệu được giữ trong cache 5 phút
  });


};

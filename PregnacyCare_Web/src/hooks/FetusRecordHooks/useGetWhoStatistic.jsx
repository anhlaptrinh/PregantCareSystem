// src/hooks/useFetchAppointment.js

import { useQuery } from "@tanstack/react-query";
import fetusRecordApi from "../../apis/CallAPIFetusRecord/FetusRecordAPI";
export const useFetchWhoStatistic = () => {
  

  return useQuery({
    queryKey: ["whoStatic"], // Đặt tên query để React Query có thể theo dõi và refetch khi cần
    queryFn: async () => {
        
      const response = await fetusRecordApi.getFetusWho();
      return response.data || { fetusWeek: [], weight: [], height: [] };
    },
    staleTime: 1000 * 60 * 5, // Dữ liệu được giữ trong cache 5 phút
  });


};

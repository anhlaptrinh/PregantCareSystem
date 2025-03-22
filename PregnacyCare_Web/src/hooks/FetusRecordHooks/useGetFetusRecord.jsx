// src/hooks/useFetchAppointment.js

import { useQuery } from "@tanstack/react-query";
import fetusRecordApi from "../../apis/CallAPIFetusRecord/FetusRecordAPI";
export const useFetchFetusRecordList = (id) => {
  

  return useQuery({
    queryKey: ["fetusRecord",id], // Đặt tên query để React Query có thể theo dõi và refetch khi cần
    queryFn: async () => {
      if (!id) return [];
      const response = await fetusRecordApi.getFetusRecords(id);
      return response.data || [];
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Dữ liệu được giữ trong cache 5 phút
  });


};

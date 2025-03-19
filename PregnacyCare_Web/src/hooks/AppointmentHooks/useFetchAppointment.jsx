// src/hooks/useFetchAppointment.js
import appointmentApi from "../../apis/CallAPIAppointment/AppointmentAPI"; // Import API quản lý
import { useQuery } from "@tanstack/react-query";
export const useFetchAppointment = () => {
  

  return useQuery({
    queryKey: ["appointments"], // Đặt tên query để React Query có thể theo dõi và refetch khi cần
    queryFn: async () => {
      const response = await appointmentApi.getAppointments();
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5, // Dữ liệu được giữ trong cache 5 phút
  });


};

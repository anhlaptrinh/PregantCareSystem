import { useMutation, useQueryClient } from "@tanstack/react-query";
import appointmentApi from "../../apis/CallAPIAppointment/AppointmentAPI";
import { message } from "antd";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  
  return useMutation({
    mutationFn: (data) => appointmentApi.createAppointment(data), // Định nghĩa mutationFn đúng cách
    onSuccess: () => {
      message.success("Created successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] }); // Làm mới danh sách cuộc hẹn
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
};
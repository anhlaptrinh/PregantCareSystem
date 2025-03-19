import { useMutation, useQueryClient } from "@tanstack/react-query";
import appointmentApi from "../../apis/CallAPIAppointment/AppointmentAPI";
import { message } from "antd";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data ) => appointmentApi.updateAppointment(data), // Gọi API PUT để cập nhật cuộc hẹn
    onSuccess: () => {
        message.success("Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] }); // Làm mới danh sách cuộc hẹn sau khi cập nhật thành công
    },
    onError: (error) => {
      console.error("Error updating appointment:", error);
    },
  });
};

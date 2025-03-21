import { useMutation, useQueryClient } from "@tanstack/react-query";
import appointmentApi from "../../apis/CallAPIAppointment/AppointmentAPI";
import { message } from "antd";
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>appointmentApi.deleteAppointment(id),
    onSuccess: () => {
        message.success("Deleted successfully");
      // Sau khi xóa thành công, cập nhật danh sách cuộc hẹn
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa cuộc hẹn:", error);
    },
  });
};

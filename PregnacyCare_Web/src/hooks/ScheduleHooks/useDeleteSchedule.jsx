import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import scheduleApi from "../../apis/CallAPIAppointment/ScheduleAPI";
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>scheduleApi.deleteSchedule(id),
    onSuccess: () => {
        message.success("Deleted successfully");
      // Sau khi xóa thành công, cập nhật danh sách cuộc hẹn
      queryClient.invalidateQueries(["Schedules"]);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa cuộc hẹn:", error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetusRecordApi from "../../apis/CallAPIFetusRecord/FetusRecordAPI";
import { message } from "antd";
export const useDeleteFetusRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>fetusRecordApi.deleteFetusRecord(id),
    onSuccess: () => {
        message.success("Deleted successfully");
      // Sau khi xóa thành công, cập nhật danh sách cuộc hẹn
      queryClient.invalidateQueries({ queryKey: ["fetusRecord"] }); // Làm mới danh sách cuộc hẹn
      queryClient.invalidateQueries({ queryKey: ["fetusStatic"] }); // Làm mới danh sách cuộc hẹn
    },
    onError: (error) => {
      console.error("Lỗi khi xóa cuộc hẹn:", error);
    },
  });
};

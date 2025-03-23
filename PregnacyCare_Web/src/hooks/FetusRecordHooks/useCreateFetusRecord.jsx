import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetusRecordApi from "../../apis/CallAPIFetusRecord/FetusRecordAPI";
import { message } from "antd";

export const useCreateFetusRecord = () => {
  const queryClient = useQueryClient();

  
  return useMutation({
    mutationFn: ({id,data}) => fetusRecordApi.createFetusRecord(id,data), // Định nghĩa mutationFn đúng cách
    onSuccess: () => {
      message.success("Created successfully");
      queryClient.invalidateQueries({ queryKey: ["fetusRecord"] }); // Làm mới danh sách cuộc hẹn
      queryClient.invalidateQueries({ queryKey: ["fetusStatic"] }); // Làm mới danh sách cuộc hẹn
    
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
};
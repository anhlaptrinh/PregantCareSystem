import { useMutation, useQueryClient } from "@tanstack/react-query";
import scheduleApi from "../../apis/CallAPIAppointment/ScheduleAPI";
import { message } from "antd";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  
  return useMutation({
    mutationFn: (data) => scheduleApi.createSchedule(data), // Định nghĩa mutationFn đúng cách
    onSuccess: () => {
      message.success("Created successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] }); // Làm mới danh sách cuộc hẹn
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
};
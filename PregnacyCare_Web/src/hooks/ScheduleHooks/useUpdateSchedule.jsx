import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import scheduleApi from "../../apis/CallAPIAppointment/ScheduleAPI";

export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => scheduleApi.updateSchedule(data), // Đảm bảo truyền id và data đúng cách
      onSuccess: () => {
        message.success("Updated successfully");
        queryClient.invalidateQueries(["Schedules"]);
      },
      onError: (error) => {
        
        console.error("Error updating appointment:", error);
      },
    });
  };
  

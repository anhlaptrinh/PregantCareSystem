// hooks/ScheduleHooks/useFetchSchedule.js
import { useState, useEffect } from 'react';
import scheduleApi from '../../apis/CallAPIAppointment/ScheduleAPI';

const useFetchSchedule = (appointmentId) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!appointmentId) return;
      
      try {
        setLoading(true);
        const response = await scheduleApi.getScheduleById(appointmentId);
        const data = await response.json();
        setSchedule(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [appointmentId]);

  return { schedule, loading, error };
};

export default useFetchSchedule;
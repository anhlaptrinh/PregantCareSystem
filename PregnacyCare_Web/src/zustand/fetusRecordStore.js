import { create } from "zustand";

const useFetusRecordStore = create((set) => ({
  fetusRecords: {}, // Object lưu danh sách record theo fetusId
  setFetusRecords: (fetusId, records) =>
    set((state) => ({
      fetusRecords: { ...state.fetusRecords, [fetusId]: records },
    })),
  updateRecord: (fetusId, recordId, updatedRecord) =>
    set((state) => ({
      fetusRecords: {
        ...state.fetusRecords,
        [fetusId]: state.fetusRecords[fetusId]?.map((record) =>
          record.id === recordId ? { ...record, ...updatedRecord } : record
        ),
      },
    })),
  deleteRecord: (fetusId, recordId) =>
    set((state) => ({
      fetusRecords: {
        ...state.fetusRecords,
        [fetusId]: state.fetusRecords[fetusId]?.filter(
          (record) => record.id !== recordId
        ),
      },
    })),
}));

export default useFetusRecordStore;

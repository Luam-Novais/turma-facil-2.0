import { create } from 'zustand';

type studentId = number | null;
interface Modal {
  modal: boolean;
  student_id: number | null;
  handleModalToStudent: (value: boolean, id: studentId) => void;
  handleModal: (value: boolean) => void
}
export const useOpenModal = create<Modal>((set) => {
  return {
    modal: false,
    student_id: null,
    handleModalToStudent: (value: boolean, id: studentId) => set((state) => ({ modal: value, student_id: id })),
    handleModal: (value) => set((state) => ({modal: value}))
  };
});
 
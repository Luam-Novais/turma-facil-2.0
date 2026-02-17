import {create} from 'zustand'

type studentId = number | null
interface Modal{
    modal: boolean,
    student_id: number | null
    handleModal: (value: boolean, id:studentId)=> void
}
export const useOpenModal = create<Modal>((set)=>{
  return{
      modal: false,
      student_id: null,
    handleModal: (value : boolean, id: studentId)=> set((state)=> ({modal: value, student_id: id}))
  }
})
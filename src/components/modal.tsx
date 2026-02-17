import { useOpenModal } from '../stores/modalStore';
import { UpdateStudentDTO } from '../types/students';
import { Input, Select, TextArea } from './input';
import { Button } from './button';
import { Divide, X } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateStudentService } from '../service/studentService';

export function UpdateModal() {
  const { handleModal, student_id } = useOpenModal();
  const { handleSubmit, register } = useForm<UpdateStudentDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  function desactiveModal() {
    handleModal(false, null);
  }
  const onSubmit: SubmitHandler<UpdateStudentDTO> = async (data) => {
    try {
      if(student_id){
        const {response, json} = await updateStudentService(student_id, data);
        if(response){
          desactiveModal()
        }
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <div className="bg-black/85 absolute top-0 left-0 p-8 w-full">
      <div className="bg-gray-50 shadow-md w-full  rounded-md p-4 flex flex-col gap-4 ">
        <span className="flex justify-between">
          <h1>Editar aluno</h1>
          <button onClick={desactiveModal}>
            <X color="red" />
          </button>
        </span>
        <p className="text-sm text-gray-600">Escreva apenas nos campos que deseja alterar.</p>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
          <Input label="Nome" register={register('name')} />
          <Input label="Telefone" register={register('phone')} />
          <Input label="CPF" register={register('cpf')} />
          <Input label="Data de Nascimento" type="date" register={register('date_birth')} />
          <TextArea label="Observações" register={register('observations', { required: false })} />
          <Select options={subscriptionTypes} register={register('subscription_type',{required: true})} />
          <Button loadingState={loading}>Editar</Button>
        </form>
      </div>
    </div>
  );
}
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];

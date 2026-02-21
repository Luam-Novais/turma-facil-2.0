import { useOpenModal } from '../stores/modalStore';
import { UpdateStudentDTO } from '../types/students';
import { Input, Select, TextArea } from './input';
import { Button } from './button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { deleteStudentService, updateStudentService } from '../service/studentService';
import { useToastStore } from '../stores/toastStore';
import { Spinner } from './spinner';

function ContainerModal({children}: {children: React.ReactNode}){
  return <div className="bg-black/45 absolute top-0 left-0 flex justify-center  p-4 md:p-8 w-full h-full backdrop-blur-md transition-colors duration-1000 ease-in-out">{children}</div>;
}

export function UpdateModal() {
  const { setToast } = useToastStore();
  const { handleModal, student_id } = useOpenModal();
  const { handleSubmit, register } = useForm<UpdateStudentDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  function desactiveModal() {
    handleModal(false, null);
  }
  const onSubmit: SubmitHandler<UpdateStudentDTO> = async (data) => {
    try {
      const formatData = { ...data };
      if (!subscriptionTypes.includes(data.subscription_type)) formatData.subscription_type = undefined;
      if (student_id) {
        setLoading(true);
        const { response, json } = await updateStudentService(student_id, data);
        if (response.ok) {
          setToast('success', json.message);
          desactiveModal();
        } else {
          setToast('error', json.messageError);
        }
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ContainerModal>
      <div className="bg-gray-50 shadow-md w-full h-full rounded-md p-4 flex flex-col gap-4 ">
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
          <Select options={subscriptionTypes} register={register('subscription_type', { required: true })} />
          <Button loadingState={loading}>Editar</Button>
        </form>
      </div>
    </ContainerModal>
  );
}
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];

export function DeleteModal() {
  const { setToast } = useToastStore();
  const { handleModal, student_id } = useOpenModal();
  const [loading, setLoading] = useState<boolean>(false);

  function desactiveModal() {
    handleModal(false, null);
  }

  async function deleteStudent() {
    try {
      setLoading(true);
      if (!student_id) throw new Error('id de usuario nao enviado.');
      const { response, json } = await deleteStudentService(student_id);
      if (response.ok) {
        setToast('success', 'Aluno excluído com sucesso.');
      } else {
        setToast('error', 'Falha ao excluir aluno tente novamente.');
      }
      desactiveModal();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ContainerModal>
      <div className="bg-gray-50 shadow-md w-full h-1/4 rounded-md p-4 flex flex-col gap-4 justify-between animate-show-modal">
        {loading ? (
          <span className="flex justify-center items-center">
            <Spinner />
          </span>
        ) : (
          <>
            {' '}
            <p className="text-sm md:text-base">Tem Certeza que realmente deseja exluir o aluno ?</p>
            <span className="flex justify-between">
              <button onClick={desactiveModal}>Cancelar</button>
              <button
                onClick={deleteStudent}
                className="flex justify-center text-sm gap-2 items-center bg-red-600 px-4 py-1 text-white 
                shadow-xl rounded-md transition-colors duration-300 ease-in-out hover:bg-red-700"
              >
                Excluir
              </button>
            </span>
          </>
        )}
      </div>
    </ContainerModal>
  );
}

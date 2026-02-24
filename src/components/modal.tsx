import { useOpenModal } from '../stores/modalStore';
import { StudentWithSubscription, UpdateStudentDTO } from '../types/students';
import { Input, SearchInput, Select, TextArea } from './input';
import { Button, ButtonCloseModal } from './button';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { deleteStudentService, updateStudentService, getStudentsBySearch } from '../service/studentService';
import { useToastStore } from '../stores/toastStore';
import { Spinner } from './spinner';
import { List } from './list';
import { CardSelectedStudent } from './card';
import { ErrorInfo } from './error';

function ContainerModal({ children }: { children: React.ReactNode }) {
  return <div className="bg-black/45 absolute top-0 left-0 flex justify-center  p-4 md:p-8 w-full h-full backdrop-blur-md transition-colors duration-1000 ease-in-out">{children}</div>;
}

export function UpdateModal() {
  const { setToast } = useToastStore();
  const { handleModalToStudent, student_id } = useOpenModal();
  const { handleSubmit, register } = useForm<UpdateStudentDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  function desactiveModal() {
    handleModalToStudent(false, null);
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
      <div className="bg-gray-50 shadow-md w-full h-full rounded-md p-4 flex flex-col gap-4 animate-show-modal">
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
  const { handleModalToStudent, student_id } = useOpenModal();
  const [loading, setLoading] = useState<boolean>(false);

  function desactiveModal() {
    handleModalToStudent(false, null);
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
type SearchStudentsModalProps = {
  setSelectedStudent: (value: number | null) => void;
  selectedStudent: number | null;
};
export function SearchStudentModal({ setSelectedStudent, selectedStudent }: SearchStudentsModalProps) {
  const { handleModal } = useOpenModal();
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultStudents, setResultStudents] = useState<StudentWithSubscription[] | null>(null);
  const { setValue } = useFormContext();
  function desactiveModal() {
    handleModal(false);
  }
  async function fetchStudentsBySearch() {
    if (!search || search.length <= 0) return;
    try {
      setLoading(true);
      const { response, json } = await getStudentsBySearch(search);
      setResultStudents(json);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    setResultStudents(null);
    const delay = setTimeout(() => {
      fetchStudentsBySearch();
      setLoading(false);
    }, 400);
    return () => {
      clearTimeout(delay);
    };
  }, [search]);
  return (
    <ContainerModal>
      <div className="animate-show-modal h-full bg-white w-full rounded-md shadow-md p-4 flex flex-col gap-4">
        <span className="flex items-center justify-between ">
          <h1>Busque o aluno(a)</h1>
          <ButtonCloseModal desactiveModal={desactiveModal}>
            <X />
          </ButtonCloseModal>
        </span>

        <label htmlFor="search">Buscar aluno</label>
        <input id="search" type="text" onChange={handleChange} className="text-base border border-gray-400 rounded-sm w-full shadow bg-gray-100 p-2" placeholder="Buscar aluno..." />
        {loading && <Spinner />}
        {resultStudents && resultStudents.length > 0 && (
          <div className="bg-gray-100 px-1 py-4 rounded-md shadow-md">
            {resultStudents.map((student) => (
              <CardSelectedStudent selectedStudent={selectedStudent} key={student.id} student={student} setSelectedStudent={setSelectedStudent} />
            ))}
          </div>
        )}
        {resultStudents && resultStudents.length === 0 && <p>Nenhum aluno encotrado com esse nome.</p>}
      </div>
    </ContainerModal>
  );
}

'use client'
import { useForm, SubmitHandler, set } from "react-hook-form";
import { CreateStudentDTO } from "@/src/types/students";
import { Input, Select, TextArea } from "@/src/components/input";
import { Button } from "@/src/components/button";   
import { useState } from "react";
import { data_post } from "@/src/utils/fecthOp";

export default function Page(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const {register, handleSubmit} = useForm<CreateStudentDTO>()
    const onSubmit: SubmitHandler<CreateStudentDTO> = async data => {
        try {
            setError(null)
            const {url, options} = data_post('student/create', data)
            setLoading(true) 
            const response = await fetch(url, options as RequestInit)
            const json = await response.json()
            console.log(response,json)
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro ao criar o aluno. Por favor, tente novamente.');
        }finally{
            setLoading(false)   
        }
    }
    return (
      <div className="flex flex-col gap-4 p-4 min-h-screen bg-gray-100">
        <h1>Criar Aluno</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
          <Input label="Nome" register={register('name')} />
          <Input label="Telefone" register={register('phone')} />
          <Input label="CPF" register={register('cpf')} />
          <Input label="Data de Nascimento" type="date" register={register('date_birth')} />
          <TextArea label="Observações" register={register('observations', {required:false})} />
          <Select options={subscriptionTypes} register={register('subscription_type')} />
          <Button loadingState={loading}>Criar</Button>
        </form>
      </div>
    );
}
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];
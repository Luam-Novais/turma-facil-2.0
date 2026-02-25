'use client'
import { Button } from "@/src/components/button";
import { Input, InputPassword } from "@/src/components/input";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TeacherCreateDTO } from "@/src/types/auth";
import { createAccountService } from "@/src/service/loginService";
import { useRouter } from 'next/navigation';

export default function Page(){
    const {handleSubmit, register, reset} = useForm<TeacherCreateDTO>()
      const [loading, setLoading] = useState<boolean>(false)
      const [error, setError] = useState<string | null>(null);
      const redirect = useRouter()

    const onSubmit:SubmitHandler<TeacherCreateDTO> = async(data)=>{
        try {
            setLoading(true)
            const {response, json} = await createAccountService(data)
            if(response.ok){
                 redirect.push('/');
            }else setError(json.messageError)
        } catch (error: any) {
            setError(error.message)
            console.error(error)
        }finally{
            reset()
            setLoading(false)
        }
    }
    return (
      <div className="p-4 flex flex-col gap-4 h-screen">
        <span>
          <h1>Criar conta</h1>
          <p className="text-sm text-gray-600">Sistema Exclusivo para apenas um usuário.</p>
          {error && <p className="text-red-600">{error}</p>}
        </span>
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nome do Professor" type="text" placeholder="" register={register('name')} />
          <Input label="Nome de usuário" type="text" placeholder="" register={register('identifier')} />
          <InputPassword label="Senha" type="password" register={register('password')} />
          <Button loadingState={loading}>Entrar</Button>
        </form>
      </div>
    );
}
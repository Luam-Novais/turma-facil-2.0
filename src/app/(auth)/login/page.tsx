'use client'
import { Button } from "@/src/components/button";
import { Input, InputPassword } from "@/src/components/input";
import { loginService } from "@/src/service/loginService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AuthCredentialsDTO{
  identifier: string,
  password: string
}
export default function Login(){
  const {handleSubmit, register} = useForm<AuthCredentialsDTO>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const redirect = useRouter()
  const onSubmit: SubmitHandler<AuthCredentialsDTO> = async (data)=>{
    try {
      setLoading(true)
      const { res, json } = await loginService(data);
      if(res.ok){
        setError(null)
        redirect.push('/')        
      }
      else{
        setError(json.messageError)
      }
    } catch (error:any) {
      setError(error.messageError)
    }finally{
      setLoading(false)
    }
  }
    return (
      <div className="flex flex-col gap-4">
        <h1>Login</h1>
        <p className="text-sm text-gray-600">Entre com seu nome de usuário e senha</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nome de usuário" type="text" placeholder="" register={register('identifier')} />
          <InputPassword label="Senha" type="password" register={register('password')} />
          <Button loadingState={loading}>Entrar</Button>
        </form>
      </div>
    );
}
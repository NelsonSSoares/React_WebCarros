import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import {auth} from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .nonempty("O email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("A senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=>{
      await updateProfile(user.user, {
        displayName: data.name,
      })
      console.log("User registered successfully");
      navigate("/dashboard", {replace: true});
    }).catch((error)=>{
      console.log("Error registering user:", error);
    });
  }
  useEffect(()=>{

    async function handleSignOut() {
      await signOut(auth);
      console.log("User signed out successfully");
    }
    handleSignOut();
  },[]);
  
  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} alt="Logo" className="w-full" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-xl w-full rou nded-lg p-4"
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu email"
              name="email"
              errors={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              errors={errors.password?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              errors={errors.name?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
          >
            Cadastrar
          </button>
        </form>
        <Link to="/login" className="text-zinc-600 hover:text-zinc-900">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </Container>
  );
}

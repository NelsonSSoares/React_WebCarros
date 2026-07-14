import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import { useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod/src/index.js';

const schema = z.object({
  email: z.string().email("Digite um email válido").nonempty("O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("A senha é obrigatória"),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img src={logoImg} alt="Logo" className="w-full" />
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white max-w-xl w-full rou nded-lg">
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
          <button type="submit">Acessar</button>
        </form>
      </div>
    </Container>
  );
}
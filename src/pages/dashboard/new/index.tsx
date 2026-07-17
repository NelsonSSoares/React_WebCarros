import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/PanelHeader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  model: z.string().nonempty('O campo modelo é obrigatório'),
  year: z.string().nonempty('O campo ano é obrigatório'),
  km: z.string().nonempty('O campo km é obrigatório'),
  price: z.string().nonempty('O campo preço é obrigatório'),
  city: z.string().nonempty('O campo cidade é obrigatório'),
  whatsapp: z.string().min(1, 'O campo de whataspp é obrigatóirio').refine((value)=> /^(\d{11,12})$/.test(value),{
    message:"Numero de telefone inválido"
  }),
  description: z.string().nonempty('O campo descrição é obrigatório')
})

type FormData = z.infer<typeof schema>;

export function New() {

  const {register, handleSubmit, formState:{errors}, reset} = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData){
    console.log(data);
    
  }

  return (
    <Container>
      <PanelHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flexc flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full"
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do Carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              errors={errors.name?.message}
              placeholder="Ex: Onix 1.0"
            /> 
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              errors={errors.model?.message}
              placeholder="Ex: 1.0 flex manual"
            /> 
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="mb-3">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                errors={errors.year?.message}
                placeholder="Ex: 2015/16"
              /> 
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Km</p>
              <Input
                type="text"
                register={register}
                name="km"
                errors={errors.km?.message}
                placeholder="Ex: 115.000"
              /> 
            </div>

          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="mb-3">
              <p className="mb-2 font-medium">Telefone/Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                errors={errors.whatsapp?.message}
                placeholder="Ex: 11949793053"
              /> 
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                errors={errors.city?.message}
                placeholder="Ex: São Paulo"
              /> 
            </div>

          </div>
          <div className="mb-3">
              <p className="mb-2 font-medium">Preço</p>
              <Input
                type="text"
                register={register}
                name="price"
                errors={errors.price?.message}
                placeholder="Ex: $295.000"
              /> 
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Descrição</p>
              <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              id="description"
              placeholder="Digite a descrição completa sobre o carro.."
              />
              {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
            </div>

            <button type="submit" className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium cursor-pointer">Cadastrar</button>
        </form>
      </div>
    </Container>
  );
}

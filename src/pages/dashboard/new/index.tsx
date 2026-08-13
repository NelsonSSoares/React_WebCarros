import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { z } from "zod";
import { Container } from "../../../components/container";
import { Input } from "../../../components/input";
import { PanelHeader } from "../../../components/PanelHeader";
import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo ano é obrigatório"),
  km: z.string().nonempty("O campo km é obrigatório"),
  price: z.string().nonempty("O campo preço é obrigatório"),
  city: z.string().nonempty("O campo cidade é obrigatório"),
  whatsapp: z
    .string()
    .min(1, "O campo de whataspp é obrigatóirio")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone inválido",
    }),
  description: z.string().nonempty("O campo descrição é obrigatório"),
});

/* 
interface ImageItemProps{
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
} */

type FormData = z.infer<typeof schema>;

export function New() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    //if(carImage.lenght === 0) return alert("Envie pelo menos 1 imagem deste carro!");
    /*
      const carListImages = carImages.map((car)=>{
        return{`
          uid: car.uid,
          name: car.name,
          url: car.url
        }
      }) 
     */
    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      //images: carListImages
    })
      .then(() => {
        reset();
        //setCarImages([])
        console.log("Cadastrado com sucesso");
        toast.success("Carro cadastrado com sucesso!");
      })
      .catch((e) => {
        toast.error("Erro ao cadastrar o carro. Tente novamente.");
        console.log("Error ao cadastrar no banco", e);
      });
  }
  /* 
  const [carImages, setCarImages] = useState<ImageItemProp>[]([])

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      if (image != null) {
        await handleUpload(image)
      }
      alert("Envie uma imagem jpeg ou png");
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;

    const currentUid = user?.uid;
    const uidImage = uuidV4();
    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        }
          setCarImages((images)=>{...images, imageItem})
      });
    });

    async function handleDeleteImage(item: ImageItemProps){
      const imagePath = `images/${item.uid}/${item.name}`;
      const imaeRef = ref(storage, imagePath)

      try{
        await deleteObject(imageRef);
        setCarsImages(carImages.filter((car)=> car.url !== item.url))
      }catch(e){
        console.log("ERROR:", e);
      }
    }
  } */

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
              //onChange={handleFile}
            />
          </div>
        </button>
        {/* 
            {carImages.map((item)=>{
              <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
              <button className="absolute" onclick={handleDeleteImage(item)}>
              <fiTrash size={28} color="#FFF" />
              </button>
                <img src={item.previewURL}
                  className="rounded-lg w-full h-32 object-cover"
                alt="Foto do carro"
                >
              </div>
            })}
          */}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flexc flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}

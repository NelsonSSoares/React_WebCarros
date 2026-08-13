import { Container } from "../../components/container";
import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

interface CarProps {
  id: string;
  name: string;
  year: number;
  price: number;
  km: number;
  city: string;
  //images: CarImagesProps[];
}
/* 
interface CarImagesProps {
  uid: string;
  name: string;
  url: string;
}
*/

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<string[]>([]);
  const  [inputValue, setInputValue] = useState<string>("");

  async function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));
    getDocs(queryRef).then((snapshot) => {
      const listCars = [] as CarProps[];
      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          price: doc.data().price,
          km: doc.data().km,
          city: doc.data().city,
          //uid: doc.data().uid,
          //images: doc.data().images,
        });
      });
      console.log("Cars: ", listCars);

      setCars(listCars);
    });
  }

  useEffect(() => {

    loadCars();
  }, []);

  function handleImageLoad(id: string): void {
    setLoading((prevLoading) => [...prevLoading, id]);
  }

  async function handleSearchCar() {
    if(inputValue === ''){
      loadCars();
      return;
    }
    setCars([]);
    //setLoadImages();

    const q = query(
      collection(db, "cars"),
      where("name", ">=", inputValue.toUpperCase()),
      where("name", "<=", inputValue.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("nenhum carro encontrado com esse nome",);
      setCars([]);
      return;
    }

    const listCars = [] as CarProps[];
    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        price: doc.data().price,
        km: doc.data().km,
        city: doc.data().city,
      });
    });
    setCars(listCars);
  }
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          placeholder="Digite o nome do carro.."
          className="w-full border-2 rounded-lg h-9 px-3"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
        onClick={handleSearchCar}
        className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg cursor-pointer">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center text-2xl  mb-4">
        Carros novos e usados em todo o Brasil
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link to={`/car/${car.id}`} key={car.id}>
            <section className="w-full bg-white rounded-lg">
              {/* Evitando layout shift */}
              <div
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                style={{ display: loading.includes(car.id) ? "none" : "block" }}
              ></div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src="https://files.hodoor.world/main/39f9eaba-d1ab-431a-ac30-bfa3ae5c9487.jpeg" //src={car.images[0].url}
                alt="Carro"
                onLoad={() => handleImageLoad(car.id)}
                style={{ display: loading.includes(car.id) ? "block" : "none" }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">
                  {car.year} - {car.km} km
                </span>
                <strong className="text-black font-medium text-xl">
                  R${car.price.toLocaleString("pt-BR")}
                </strong>
              </div>

              <div className="w-full h-px bg-slate-300 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}

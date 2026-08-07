import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { PanelHeader } from "../../components/PanelHeader";
import { FiTrash2 } from "react-icons/fi";
import { collection, getDocs, query, where, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../context/AuthContext";

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

export function Dashboard() {

  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);

    useEffect(() => {      
    async function loadCars() {
      if(!user?.uid) return;
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));
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
        setCars(listCars);
      });
    }
    loadCars();
  }, [user]);

  async function handleDeleteCar(id: string) {
    if (!user?.uid) return;

    const docRef = doc(db, "cars", id);
    await deleteDoc(docRef);
    
    setCars(cars.filter((car) => car.id !== id));
  }

  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
                  <section className="w-full bg-white rounded-lg relative">
          <button onClick={() => handleDeleteCar(car.id)}
           className="absolute bg-white rounded-full w-14 h-14 items-center justify-center flex right-2 top-2 drop-shadow">
            <FiTrash2 size={26} color="#000" />
          </button>
          <img
            className="w-full rounded-lg mb-2 max-h-70"
            src="https://files.hodoor.world/main/39f9eaba-d1ab-431a-ac30-bfa3ae5c9487.jpeg"
            alt=""
          />
          <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700">{car.year} - {car.km} km</span>
            <strong className="text-black font-bold mt-4">R$ {car.price.toLocaleString("pt-BR")}</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">{car.city}</span>
          </div>
        </section>
        ))}
      </main>
    </Container>
  );
}

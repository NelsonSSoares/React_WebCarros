import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarProps {
  id: string;
  name: string;
  year: number;
  price: number;
  km: number;
  city: string;
  model: string;
  description: string;
  created: string;
  uid: string;
  owner: string;
  whatsapp: string;
  //images: CarImagesProps[];
}
/* 
interface CarImagesProps {
  uid: string;
  name: string;
  url: string;
}
*/

export function CardDetails() {
  const [car, setCar] = useState<CarProps | null>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function loadCarDetails() {
      if (!id) return;
      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          price: snapshot.data()?.price,
          km: snapshot.data()?.km,
          city: snapshot.data()?.city,
          model: snapshot.data()?.model,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          uid: snapshot.data()?.uid,
          owner: snapshot.data()?.owner,
          whatsapp: snapshot.data()?.whatsapp,
          //images: snapshot.data()?.images,
        });
      });
    }
    console.log(car);
    loadCarDetails();
  }, [id]);

  return (
    <Container>
      <h1>SLIDER</h1>

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">
              {`R$ ${car?.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
            </h1>
          </div>
          <p className="text-gray-600">{car?.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
          <strong className="">Descrição: </strong>
          <p className="mb-4">{car?.description}</p>
          <strong className="">Telefone / WhatsApp: </strong>
          <p className="mb-4">{car?.whatsapp}</p>
          <a className="bg-green-500 text-white gap-2 my-6 flex items-center justify-center h-11 text-xl rounded-lg font-medium cursor-pointer" href={`https://wa.me/${car?.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Conversar com vendedor <FaWhatsapp size={26} color="#FFF" />
          </a>
        </main>
      )}
    </Container>
  );
}

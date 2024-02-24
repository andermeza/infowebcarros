import { useEffect, useState, useContext  } from 'react'
import { Container } from "../../components/container";
import { FaWhatsapp } from 'react-icons/fa';
import { collection, getDocs, where, query, doc, deleteDoc } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnection'
import {ref, deleteObject} from 'firebase/storage'
import { AuthContext } from '../../contexts/AuthContext'

interface CarProps{
  id: string;
  name: string;
  endereco: string;
  whatsapp: string;
  site: string;
  description: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps{
  name: string;
  uid: string;
  url: string
}

export function Dash() {
  const [cars, setCars] = useState<CarProps[]>([]); 
  const { user } = useContext(AuthContext);

  useEffect(() => {

    function loadParse(){
      if(!user?.uid){
        return;
      }

      const carsRef = collection(db, "parse")
      const queryRef = query(carsRef, where("uid", "==", user.uid))

      getDocs(queryRef)
      .then((snapshot) => {
        let listcars = [] as CarProps[];

        snapshot.forEach( doc => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            endereco: doc.data().endereco,
            whatsapp: doc.data().whatsapp,
            site: doc.data().site,
            description: doc.data().description,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })

        setCars(listcars);  
        
      })

    }

    loadParse();

  }, [user])



  async function handleDeleteCar(car: CarProps){
    const itemCar = car;

    const docRef = doc(db, "parse", itemCar.id)
    await deleteDoc(docRef);

    itemCar.images.map( async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`
      const imageRef = ref(storage, imagePath)

      try{
        await deleteObject(imageRef)
        setCars(cars.filter(car => car.id !== itemCar.id))
      }catch(err){
        console.log("ERRO AO EXCLUIR ESSA IMAGEM")
      }
      
    })
    
    
  }


  return (
    <Container>
      

      <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

      {cars.map( car => (
        <section key={car.id} className="w-full bg-white rounded-lg relative">
          

          <img
            className="w-full rounded-lg mb-2 max-h-70"
            src={car.images[0].url}
          />
          <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700">
              Endereço {car.endereco} 
            </span>
            <br />
            Sobre a Empresa: <strong>{car.description}
            </strong>
            
            <a
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Ola vi esse ${car.name} no site WebCarros  e fiquei interessado`}
            target="_blank"
            className="cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium"
          >
            Entrar em Contato
            < FaWhatsapp size={26} color="#fff"/>  
            </a>
            <strong className="text-black font-bold mt-4">
              Site: {car.site}
            </strong>
          </div>

          
        </section>
      )) }

      </main>

    </Container>
  )
}
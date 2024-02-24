import { Container } from "../../components/container"
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";

import { useState, useEffect } from 'react'

import {
  collection,
  query,
  getDocs,
  orderBy,
  where
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

interface CarsProps{
  id: string;
  name: string;
  endereco: string;
  uid: string;
  site: string;
  whatsapp: string;
  description: string;
  images: CarImageProps[];
}

interface CarImageProps{
  name: string;
  uid: string;
  url: string;
}


export function Parcerias() {
  const [parse, setParse] = useState<ParseProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    loadParse();
  }, [])

  function loadParse(){
    const carsRef = collection(db, "parse")
    const queryRef = query(carsRef, orderBy("created", "desc"))

    getDocs(queryRef)
    .then((snapshot) => {
      let listcars = [] as ParseProps[];

      snapshot.forEach( doc => {
        listcars.push({
          id: doc.id,
          name: doc.data().name,
          endereco: doc.data().endereco,
          site: doc.data().site,
          whatsapp: doc.data().whatsapp,
          price: doc.data().price,
          images: doc.data().images,
          uid: doc.data().uid
        })
      })

      setCars(listcars);  
    })

  }


  function handleImageLoad(id: string){
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  async function handleSearchCar(){
    if(input === ''){
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(collection(db, "cars"), 
    where("name", ">=", input.toUpperCase()),
    where("name", "<=", input.toUpperCase() + "\uf8ff")
    )

    const querySnapshot = await getDocs(q)

    let listcars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listcars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid
      })
    })

   setCars(listcars);

  }



  

  return (

    <div>
      <Container>
       
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3x1 text-black">ENCONTRE PRODUTOS E SERVIÇOS PARA SEU VEÍCULO</h1>
            
            
          </div>
          
          <div>
  <strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Adesivagem
  </strong>
</div>

          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Ar Condicionado
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Auto Elétrica
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> <Link to="/dash/id">Auto Mecânica
    </Link> 
        
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Auto Peças 
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Auto Vidros
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Chaveiros
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Corretoras de Seguros
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Despachantes
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Ferro Velho
  </strong></div>
          <div><strong className="flex items-center font-bold text-3xl text-black">
    <HiBadgeCheck size={22} color="#000" className="mr-2" /> Funilaria 
  </strong></div>

        </main>
      

      
      </Container>
      
    </div>
    
  )
}

  
    
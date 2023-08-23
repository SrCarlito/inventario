import { useNavigate } from "react-router"
import { Button } from "@material-tailwind/react"
import { collection, getDocs,query,setDoc,doc,addDoc} from "firebase/firestore"; 
import { useState } from "react";

import dataFire from './db/dataFire'




const products = collection(dataFire, "products");

const input_style = "bg-gray-100 rounded-3xl mb-4 w-72 shadow-lg outline-none p-2"
 const label_style = "text-white italic text-sm rounded-t-3xl bg-black w-40 text-center "




export default function Add(){
    const [name,setName] = useState("");
    const [purchase,setPurchase] = useState(0);
    const [sale,setSale] = useState(0);
    const [units,setUnits] = useState(0);
    const navigator = useNavigate(0)

    async function onClickHandler(){


        const res = await addDoc(products,{
            productName: name,
            purchase_price:purchase,
            sale_price: sale,
            units:units
          });
          
          console.log(res.firestore);
          navigator('/')


    }



    
    return(<>

        <form  className="min-h-screen   auto-rows-min pt-20 grid justify-items-center bg-gradient-to-b from-indigo-600 to-rose-500 ">
            <label htmlFor="" className={label_style}>NombreProducto</label>
            <input className={input_style}
                value={name}
                onChange={(e) => {setName(e.target.value)}}
            />

            <label htmlFor="" className={label_style}>Precio Compra</label>
            <input className={input_style}
                            value={purchase}
                            onChange={(e) => {setPurchase(e.target.value)}}
                            type="number"/>
            
            <label htmlFor="" className={label_style}>Precio Venta</label>
            <input className={input_style}
                            value={sale}
                            onChange={(e) => {setSale(e.target.value)}}
                            type="number"/>
            
            <label htmlFor="" className={label_style}>Unidades</label>
            <input className={input_style}
                            value={units}
                            onChange={(e) => {setUnits(e.target.value)}}
                            type="number"/>

            <Button className="bg-blue-500 p-2 rounded m-1 italic" onClick={onClickHandler}>Confirmar</Button>

        </form>
        
    </>)
}
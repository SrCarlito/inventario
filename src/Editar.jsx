import { useNavigate } from "react-router"
import { Button } from "@material-tailwind/react"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import dataFire from "./db/dataFire"
import Swal from "sweetalert2"

import { updateDoc ,setDoc,doc} from "firebase/firestore"
import Loading from "./components/Loading"
const input_style = "bg-gray-100 rounded-3xl mb-4 w-72 shadow-lg outline-none p-2"
const label_style = "text-white italic text-sm rounded-t-3xl bg-black w-40 text-center "

const timeout = (ms) =>{
    return new Promise((resolve) => {
        setTimeout(resolve,ms)
    })
}


export default function Editar(p){
    const [loaded, setLoaded ] = useState(true)
    const [params,setParams ]= useSearchParams()
    const navigator = useNavigate();
    const [name,setName] = useState("");
    const [purchase,setPurchase] = useState(0);
    const [sale,setSale] = useState(0);
    const [units,setUnits] = useState(0);



    useState(() =>{
        setName(params.get("productName").trim())
        setPurchase(Number(params.get("purchase_price")))
        setSale(Number(params.get("sale_price")))
        setUnits(Number(params.get("units")))

        console.log(params.get("id"))

    },[])





    async function handelEdit()   {
        setLoaded(false )
        await timeout(1000)
        const docRef = doc(dataFire,"products",params.get("id").trim())
        console.log(docRef)

        await updateDoc(docRef,{
            productName:name,
            purchase_price: purchase,
            sale_price: sale,
            units: units
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto editado correctamente',
            showConfirmButton: false,
            timer: 1000
          })
        
        

        navigator('/')


    }

    return(<>
        {loaded ? 
        <form  className="min-h-screen auto-rows-min pt-20 grid justify-items-center bg-gradient-to-b from-indigo-600 to-rose-500 ">
            <label htmlFor="" className={label_style}>NombreProducto</label>
            <input  onChange={(e) =>{e.preventDefault; setName(e.target.value)}} className={input_style} value={name}/>

            <label htmlFor="" className={label_style}>Precio Compra</label>
            <input  onChange={(e) =>{e.preventDefault; setPurchase(e.target.value)}}  className={input_style} type="number" value={purchase}/>
            
            <label htmlFor="" className={label_style}>Precio Venta</label>
            <input onChange={(e) =>{e.preventDefault;  setSale(e.target.value)}}  className={input_style} type="number" value={sale}/>
            
            <label htmlFor="" className={label_style}>Unidades</label>
            <input  onChange={(e) =>{e.preventDefault;  setUnits(e.target.value)}}  className={input_style} type="number" value={units}/>

            <Button className="bg-green-500 p-2 rounded m-1 italic" onClick={(e) => {handelEdit()}}>Confirmar</Button>

        </form>:<Loading></Loading>}
        
    </>)
}
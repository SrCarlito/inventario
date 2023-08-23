

import { Card, Typography,ButtonGroup,Button } from "@material-tailwind/react";
import { useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import dataFire from "../db/dataFire";

const rstyle = "rounded-3xl bg-white italic"
const TABLE_HEAD = ["Producto", "Precio Compra", "Precio Venta", "Cantidad","Opciones"];


import { collection, getDocs,query,deleteDoc,doc, Firestore} from "firebase/firestore"; 
import { useEffect, useState } from "react";




const products = collection(dataFire, "products");

async function Getter(){
    const doks =  []
    
    const docs = await getDocs(query(products))
    
    docs.docs.forEach(doc =>{
        doks.push({...doc.data(),_id:doc.id})
    })

    return doks
}





export default function DefaultTable({children,input}) {
  const [data,setData] = useState([]);
  const navigator = useNavigate()

  async function LoadData(){
    const doks =  []
  
    const docs =  await getDocs(query(products))
    
    docs.docs.forEach(doc =>{
        doks.push({...doc.data(),_id:doc.id})
    })

    setData(doks)
  }

  

  const eliminarDoc = async (id)=> {
    console.log(id)
    const docRef = doc(dataFire,"products",id)
    console.log(docRef)
    await deleteDoc(docRef);
    LoadData();

  }


  const handleDelete = (e,productName, val) =>{
    e.preventDefault()
    Swal.fire({
      title: 'Estas seguro?',
      text: `${productName} sera eliminado permanentemente!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //FETCH FUNCTION
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado correctamente.',
          'OK'
        )
        eliminarDoc(val.id)
        navigator('/')
      }
    })

  }

  useEffect(() =>{



    LoadData()

  },[])
  return (
    <Card className="  w-screen  mt-5 bg-transparent grid justify-items-center shadow-none mb-5 " >
      <table className="  w-3/4 text-left ">
        <thead >
          <tr className={rstyle}>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className=" text-center  bg-black rounded-t-3xl p-2"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ _id,productName, sale_price,purchase_price, units }) => {

            if(productName.includes( input.trim()) ){
            return (
              <tr key={_id} className={rstyle}>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal p-4"
                  >
                    {productName}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal p-4"
                  >
                    {purchase_price}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal p-4"
                  >
                    {sale_price}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium p-4"
                    
                  >
                    {units}
                  </Typography>
                </td>
                <td>
                <ButtonGroup className="grid grid-cols-2 justify-center">
                    <Button className="bg-green-500 p-2 rounded m-1 italic" onClick={(e) => {navigator(`edit/?id=${_id}
                    &productName=${productName}
                    &sale_price=${sale_price}
                    &purchase_price= ${purchase_price}
                    &units= ${units}
                    
                    `)}}>Editar</Button>
                    <Button onClick={( e) => handleDelete(e,productName,{id:_id})} className="bg-red-500 p-2 rounded m-1 italic">Eliminar</Button>
                </ButtonGroup>

                </td>
              </tr>
            );
            }
          })}
        
        </tbody>
      </table>
    </Card>
  );
}
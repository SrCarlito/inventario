
import { useContext, useState } from 'react'
import './App.css'
import SearchList from './components/SeachList'
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';


function App() {
  const [text,setText] =useState('');
  const [params, setParams] = useSearchParams()

  
  const navigator = useNavigate()

  return (


    

    <div className='  w-75 auto-rows-min  pt-20 grid justify-items-center bg-gradient-to-b from-indigo-600 to-rose-500 min-h-screen' >
      <h1 className='font-bold text-3xl text-white  '
       >Inventario</h1>
      <input 
        value = {text}
        onChange={(e) => {setText(e.target.value)}}
      className=' p-4 rounded-full w-7/12 text-xs  h-6   outline-none bg-slate-100 focus:bg-white'/>
      <Button onClick={(e) =>{navigator('/add')}} className='bg-blue-500 italic shadow-md rounded-3xl p-3 m-3'>Añadir Producto</Button>
      <SearchList  input={text}/>
      

    </div>

  )
}

export default App

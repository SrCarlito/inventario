import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Editar from './Editar.jsx'
import Add from './Add.jsx'
import {BrowserRouter, Routes,Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/" Component={App}/>
        <Route path='/edit' Component={Editar}></Route>
        <Route path='/add' Component={Add}></Route>
      </Routes>
    </BrowserRouter>

    
  </React.StrictMode>,
)

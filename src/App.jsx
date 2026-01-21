import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import Admin from '../src/pages/Admin'
import Header from '../src/Components/Header'
import Footer from '../src/Components/Footer'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

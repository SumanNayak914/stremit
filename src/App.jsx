import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import Header from '../src/Components/Header'
import Footer from '../src/Components/Footer'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

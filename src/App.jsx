import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from '../src/pages/Home'  // Hidden for now
import Admin from '../src/pages/Admin'
import Header from '../src/Components/Header'
import Footer from '../src/Components/Footer'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        {/* Home page hidden for now */}
        {/* <Route path='/home' element={<Home/>}/> */}
        <Route path='/' element={<Admin/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

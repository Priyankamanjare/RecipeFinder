import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeDetails from './components/RecipeDetails'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className='bg-yellow-50 min-h-screen w-full '>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/recipes/:id' element={<RecipeDetails/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

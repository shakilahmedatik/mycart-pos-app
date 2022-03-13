import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Bills from './pages/Bills'
import CartPage from './pages/CartPage'
import Homepage from './pages/Homepage'
import Customers from './pages/Customers'
import Items from './pages/Items'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Homepage />} />
          <Route path='/items' element={<Items />} />
          <Route path='/bills' element={<Bills />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

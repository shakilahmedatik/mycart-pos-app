import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Items from './pages/Items'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Homepage />} />
          <Route path='/items' element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

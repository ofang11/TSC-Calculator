import { useState } from 'react'
import './App.css'
import Calculator from './Components/Calculator'

function App() {
  return (
    <>
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh " }}>
        <Calculator />
      </div>
    </>
  )
}

export default App

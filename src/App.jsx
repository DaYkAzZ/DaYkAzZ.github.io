import React from 'react'
import { Weather } from './components/Weather'

function App() {
  return (
    <div className='p-24'>
      <h1 className='text-3xl m-5 text-left'>
        Bienvenue dans votre espace Météo
      </h1>
      <Weather />
    </div>

  )
}

export default App

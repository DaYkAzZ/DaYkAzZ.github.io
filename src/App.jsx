import React from 'react'
import { Weather } from './components/Weather'
import { Forecast } from './components/Forecast'


function App() {
  return (
    <div className='px-24 py-16 bg-black/90'>
        <Weather />
        <Forecast />
    </div>

  )
}

export default App

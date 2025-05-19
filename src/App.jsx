import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { index_routage } from './routage/routage'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
<RouterProvider router={index_routage}></RouterProvider>
    </>
  )
}

export default App

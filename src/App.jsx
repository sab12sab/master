import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { index_routage } from './routage/routage'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './ContexT/ContextAPI'

function App() {
  return (
    <>
    
    <AuthProvider>
<RouterProvider router={index_routage}></RouterProvider>
</AuthProvider>
    </>
  )
}

export default App

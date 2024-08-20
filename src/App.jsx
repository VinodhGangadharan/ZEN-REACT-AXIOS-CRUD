import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bike from "./components/Bike"
import bikeLoader from "./loaders/bikeLoader";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Bike/>,
    loader: bikeLoader
  }
]);


function App() {

return <RouterProvider router={router} />;
    
}

export default App

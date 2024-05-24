import { useState } from 'react'
import Navbar from './Navbar'
import './App.css'
import Home from './Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import FirstPage from './FirstPage'


function App() {
  const [search, setSearch] = useState(''); // staden som användaren sökt ligger här
  const [click, setClick] = useState(null); // staden som användaren sökt ligger här

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <FirstPage search = {search} setSearch= {setSearch}  click= {click} />
    },
    {
      path: '/search',
      element: <Home search = {search} setSearch= {setSearch} setClick = {setClick}/>
    }
    
    
  ])






  return (
    <div>
     
      <RouterProvider router={ router }/>

      
    </div>
  )
}

export default App

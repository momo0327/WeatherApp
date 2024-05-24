import React from 'react'
import App from './App'
import { useNavigate } from 'react-router-dom'
import './FirstPage.scss'

function FirstPage({search, setSearch,click}) {
    const navigate = useNavigate()

    function handleSearch() {
        click
        navigate('/search')
    }



  return (
      <div className='input-parent-container'>
          <div className='input-container'>
                  <input className='navbar-search' type="text" placeholder="Search city here.." value={search} onChange={(e)=> {setSearch(e.target.value)}} />
                  <button onClick={handleSearch}> Search</button>

              </div>  
      </div>
                    
  )
}

export default FirstPage
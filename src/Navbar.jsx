import Home from './Home';
import './navbar.scss'
import { useState } from 'react';
import { Icon } from '@iconify/react';

function Navbar({cityChange, cityValue, func,cityLocation, positionClick}){


  {/* <h1 className='navbar-logo'>{cityName}</h1> */}
    return(
        
            <div className="navbar-body">
                <div>
                    <h1 className='navbar-logo'>
                        <button className='button' onClick={positionClick}>Get location</button>
                    </h1>
                    </div>

                    <div>
                        <input className='navbar-search' type="text" placeholder="Search city here.." value={cityValue} onChange={(e)=> {
                            cityChange(e.target.value)}} />

                            <button className='button-search' onClick={func}>
                            <Icon icon="material-symbols:search" width="17" height="17" color="white" />
                            </button>
                    </div>            
                
                </div>
    
        
    )
}

export default Navbar
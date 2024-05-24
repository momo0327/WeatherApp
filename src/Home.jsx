import './Home.scss'
import { useState, useEffect } from 'react'
import Navbar from './Navbar';
import { Icon } from '@iconify/react';


  

function Home ({search,setSearch,setClick,click}) {
    const [tempNow, setTempNow] = useState(''); 
    const [tempMax, setTempMax] = useState(''); 
    const [tempMin, setTempMin] = useState(''); 
    const [icon, setIcon] = useState(''); 
    const [desc, setDesc] = useState(''); 
    const [country, setCountry] = useState(''); 
    const [location, setLocation] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [sunrise, setSunRise] = useState();
    const [sunset, setSunSet] = useState();
    const [feels, setFeels] = useState();  
    const [pressure, setPressure] = useState();  
    const [visibility, setVisibility] = useState();  
    const [humidity, setHumidity] = useState();  
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)


   
        function handleClick() {
       
          getCurrentWeather();
          fiveDay();
        }


        useEffect(() => {
            // Save the handleClick function to the state
            setClick(handleClick);
          }, []);
        
  

      
    async function getCurrentWeather() {

        const API_key = '1fa08ab745ea0e9e79b40e18d7c007aa';
  
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_key}`);
        const data = await response.json();

        setTempNow(Math.ceil(data.main.temp)); 
        console.log(data);
        setTempMax(Math.ceil(data.main.temp_max))
        setTempMin(Math.ceil(data.main.temp_min))
        setFeels(Math.ceil(data.main.feels_like))
        setHumidity(data.main.humidity)
        setPressure(data.main.pressure)
        setVisibility(data.visibility)
        setLocation(data.name)
        setIcon(data.weather[0]?.icon)
        setDesc(data.weather[0].description);
       

        
      }
          
        async function fiveDay() {
         const API_key = 'dbb73ec7c836945f41cee29558b4fc92';
         const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${API_key}`)
         const data = await response.json()
         console.log(data)
         setCountry(data.city.country)
         setSunRise(data.city.sunrise)
         setSunSet(data.city.sunset)
         console.log(country);

        

         const forecastArray = [data.list[6],data.list[15],data.list[23],data.list[31],data.list[39]]
         
            console.log(forecastArray)

         const data2 = []
         for(let n = 0 ; n < 20 ; n++) {
             if(forecastArray[n]) {
                 data2.push(forecastArray[n])
             }}
     
             setForecast(data2)
             console.log(forecast);
 
       }


       
        function getPosition() {
            if( 'geolocation' in navigator ) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // console.log('Position is: ', position)
                    const coords = GeolocationCoordinates = position.coords
                    // console.log('coords: ', coords);
                    // console.log('timestamp: ', position.timestamp);
                    
                    setLat(coords.latitude)
                    setLong(coords.longitude)
                })	

            }
        }






       async function getPositionLocation() {

        const API_key = 'dbb73ec7c836945f41cee29558b4fc92'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_key}`)
        const data = await response.json()
        console.log(data)
        setTempNow(Math.ceil(data.main.temp)); 
        console.log(data);
        setTempMax(Math.ceil(data.main.temp_max))
        setTempMin(Math.ceil(data.main.temp_min))
        setFeels(Math.ceil(data.main.feels_like))
        setHumidity(data.main.humidity)
        setPressure(data.main.pressure)
        setVisibility(data.visibility)
        setLocation(data.name)
        setIcon(data.weather[0]?.icon)
        setDesc(data.weather[0].description)
       }


       function getPositionClick() {
            getPosition()
            getPositionLocation()
            fiveDayPosition()
       }





               
    async function fiveDayPosition() {
        const API_key = 'dbb73ec7c836945f41cee29558b4fc92';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${API_key}`)
        const data = await response.json()
        console.log(data)
        setCountry(data.city.country)
        setSunRise(data.city.sunrise)
        setSunSet(data.city.sunset)
        console.log(country);
   
       
   
        const forecastArray = [data.list[6],data.list[15],data.list[23],data.list[31],data.list[39]]
        
           console.log(forecastArray)
   
        const data2 = []
        for(let n = 0 ; n < 20 ; n++) {
            if(forecastArray[n]) {
                data2.push(forecastArray[n])
            }}
    
            setForecast(data2)
            console.log(forecast);
   
      }

    
  





       //MAPPING mappar ut main temperaturen från forecastArray
       const content = forecast.map((indWeather)=> {   
            return  Math.ceil(indWeather.main?.temp)
       })
       
      
    //    //MAPPING mappar ut datum temperaturen från forecastArray
    //    const contentDate = forecast.map((indDate)=> {   
    //         return  indDate.dt_txt
    //    })

    const contentDate = forecast.map((indDate) => {
        const date = new Date(indDate.dt_txt);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()]; // Get the weekday name
      
        return {
          date: indDate.dt_txt,
          weekday: dayOfWeek,
        };
      });
      


      const contentDay = contentDate.map((indDay)=> {
            return indDay.weekday
      })
      

      const contentIcon = forecast.map((indIcon)=> {   
        return  indIcon.weather[0]?.icon 
   })
   

  

        
      
     


 
  return (
    <div>
        
            <Navbar cityChange = {setSearch} cityValue = {search} func = {handleClick} cityName = {location} positionClick = {getPositionClick} />

            <div className='weather-header'>
                <h1>{location}, {country}</h1>  
            </div>

            <div className="landing-main">

                <div className='weather-container'> 
                        <div className='weather-title'>
                            <p className='now'>NOW</p>
                        </div>

                        <div className='main-temp-icon'>
                                <div className='main-temp'>{tempNow}°</div>
                            <img  className='main-icon' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="main weather icon" />
                        </div>

                        <div className='weather-description'>
                            <p className='weather-description'>{desc}</p>
                        </div>
                    <hr />
                    
                    <div className='sub-weather-container'>
                        <div className='sub-weather-container-tag'>
                        
                            <p >H: {tempMax}°</p>  
                            <p>L: {tempMin}°</p> 
                        </div>
                        
                    </div>
                </div>
               
              
                <article className='right-container'>

                    <div className='right-container-gridOne'>
                        <div className='sunrise-grid'>
                            <div className='sunrise-container'>
                              {sunrise} {sunset}
                            </div>
                        </div>
                       
                       <div className='humidity-grid'>
                            <div className='humidity-container'>
                                <div className='humidy-icon'>
                                    <Icon icon="ph:drop-fill" width="28" height="28" color="white" />
                                </div>

                                <div className='humidity-value'>
                                    {humidity}%
                                </div>
                                
                            </div>
                       </div>
                           
                    </div>
                
                    <div className='right-container-gridTwo'>

                        <div className='feels-like-grid'>
                            <div className='feels-like-container'>
                                <div className='feels-icon'>
                                    <Icon icon="fluent:temperature-32-regular"  width="36" height="36" color="white" />
                                </div>
                                <div className='feels-value'>
                                    {feels}°
                                </div>
                                    
                            </div>
                        </div>
                      
                        <div className='visibility-grid'>
                            <div className='visibility-container'>
                                <div className='visibility-icon'>
                                    <Icon icon="mdi:eye"  width="32" height="32" color="white" />
                                </div>

                                <div className='visibility-value'>
                                { visibility}
                                </div>
                            </div>
                        </div>
                            

                        <div className='pressure-grid'>
                            <div className='pressure-container'>
                                <div className='pressure-icon'>
                                    <Icon icon="lets-icons:pressure" width="32" height="32"  color="white" /> 
                                </div>

                                <div className='pressure-value'>
                                    {pressure}hPa
                                </div>
                            </div>
                        </div>
                           
                    </div>
                  
                   
                </article>
                
            </div>
            <div className='forecast-container'>
                <article className='forecast-main'>
                    <ul className='forecast-list'>
                        <li className='forecast-list-content'>
                            <p>{contentDay[0]}</p>
                            <img  className='iconImg' src={`https://openweathermap.org/img/wn/${contentIcon[0]}@2x.png`} alt="" />  
                            <p>{content[0]}°</p>
                        </li>

                        <li className='forecast-list-content'>
                            <p>{contentDay[1]}</p>
                            <img className='iconImg' src={`https://openweathermap.org/img/wn/${contentIcon[1]}@2x.png`} alt="" />
                            <p>{content[1]}°</p>
                        </li>

                        <li className='forecast-list-content'>
                            <p>{contentDay[2]}</p>
                            <img className='iconImg' src={`https://openweathermap.org/img/wn/${contentIcon[2]}@2x.png` }alt="" />
                            <p>{content[2]}°</p>
                        </li>

                        <li className='forecast-list-content'>
                            <p>{contentDay[3]}</p>
                            <img className='iconImg' src={`https://openweathermap.org/img/wn/${contentIcon[3]}@2x.png`} alt="" />
                            <p>{content[3]}°</p>
                        </li>

                        <li className='forecast-list-content'>
                            <p>{contentDay[4]}</p>
                            <img className='iconImg' src={`https://openweathermap.org/img/wn/${contentIcon[4]}@2x.png`} alt="" />
                            <p>{content[4]}°</p>
                        </li>
                        
                    </ul>
                </article>
            </div>
            
           

        </div>
  
  )
    
  }

export default Home
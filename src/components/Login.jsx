import { useState, useEffect } from 'react'
import rain from '../img/rain.png'
import sun from '../img/sun.png'
import clouds from '../img/clouds.png'
import extreme from '../img/extreme.png'
import snow from '../img/snow.png'
import thunderstorm from '../img/thunderstorm.png'
import drizzle from '../img/drizzle.png'
import mist from '../img/mist.png'
import welcome from '../img/welcome.png'

const API_KEY = '1d11eb0579449dba20b7dd6f4019234a'
const welcomeHeader = "Haydi, keşfetmeye başlayın!"
const welcomeParagraphDescription = "Şehirlerin hava durumunu kolayca öğrenebileceğiniz bu uygulamaya hoş geldiniz! Arama çubuğuna merak ettiğiniz şehri yazın ve anlık hava durumu bilgilerine ulaşın. Güneşli mi, yağmurlu mu yoksa kar yağışlı mı? Cevap burada sizi bekliyor!"

function Login() {
const [searchCity , setSearchCity] = useState('');
const [findedCity , setFindedCity] = useState({name:'',temp:0,weather:''});
const [weatherIcons , setWeatherIcons] = useState(welcome);
const [weatherName , setWeatherName] = useState('')
const [welcomeParagraphContent , setWelcomeParagraphContent] = useState('')
const fetchWeatherByCityName=()=>{

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchCity+'&units=metric&appid='+API_KEY)
    .then((response)=>response.json())
    .then((json)=>{
      setFindedCity({name:json.name,temp:Math.round(json.main.temp),weather:json.weather[0].main})
      console.log("hava durumu",findedCity.weather)
    })
}

useEffect(() => {
  if(findedCity.weather !== ''){
    setWelcomeParagraphContent('')
  }
  if(findedCity.weather==='Clouds'){
    setWeatherIcons(clouds)
    setWeatherName('Bulutlu')
  }
  else if(findedCity.weather===''){
    setWeatherIcons(welcome)
    setWeatherName(welcomeHeader)
    setWelcomeParagraphContent(welcomeParagraphDescription)
  }
  else if(findedCity.weather==='Clear'){
    setWeatherIcons(sun)
    setWeatherName('Güneşli')
  }
  else if(findedCity.weather==='Rain'){
    setWeatherIcons(rain)
    setWeatherName('Yağmurlu')
  }
  else if(findedCity.weather==='Snow'){
    setWeatherIcons(snow)
    setWeatherName('Kar Yağışlı')
  }
  else if(findedCity.weather==='Thunderstorm'){
    setWeatherIcons(thunderstorm)
    setWeatherName('Fırtınalı')
  }
  else if(findedCity.weather==='Drizzle'){
    setWeatherIcons(drizzle)
    setWeatherName('Sağanak Yağışlı')
  }
  else if(findedCity.weather==='Extreme'){
    setWeatherIcons(extreme)
    setWeatherName('Kasırgalı')
  }
  else if(findedCity.weather==='Mist'){
    setWeatherIcons(mist)
    setWeatherName('Sisli')
  }
  else{
    setWeatherIcons('')

  }}, [findedCity.weather]);



const weatherMainImg=()=>{
  if(weatherIcons===welcome){
    return <img src={weatherIcons} style={{height:'50%',width: 'auto'}} />
  }
  else{
    return  <img src={weatherIcons} />
  }
}
const welcomeParagraph=()=>{
  return <span>{welcomeParagraphContent}</span>
}
  return (
    <>
    <div className='App'>
      <div className='searchInput'>

        <input
          value={searchCity}
          onChange={(e)=>{
            setSearchCity(e.target.value)
        }} placeholder='Hava durumunu öğrenmek istediğiniz şehiri giriniz...' />

        <button onClick={fetchWeatherByCityName}>ARA</button> 

      </div>
      <div className='weatherManager'>
        <div className='weatherContent'>
          
            
            {findedCity.name!=='' &&
            <div className='weatherCity'>
            <span>
              {findedCity.name}
            </span>
            
            <span>
              {findedCity.temp}°C
            </span>
            </div>
            }
            <div className='weatherMain'>
              
              {weatherMainImg()}
              <p>
                {weatherName}
              </p>
              {welcomeParagraph()}
            </div>
            


            
            
          

        </div>
      </div>
      
      
    </div>
    </>
  )
}

export default Login

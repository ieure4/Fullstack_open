import axios from 'axios'
import { useState, useEffect} from 'react'
const DetailedView = ({searchedArray, country})=>{
    const [weatherInformation, setWeatherInformation] = useState(null)
    const apikey = `4a93b6811cbf166725951b42f37d7e4f`   

    useEffect(()=>{
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apikey}`)
            .then(response=>(setWeatherInformation(response.data)))
            .catch(error=>console.error(`Could not fetch weather data`, error))
        
    },[searchedArray, apikey])

    return(
        <div>
        <h1>{country.name.official}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area} km²</p>
        <h2>languages:</h2>
        <ul>
        {Object.values(country.languages).map((language, index)=>(
            <li key = {index} >{language}</li>))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width = "150"/>
        {weatherInformation&&(
            <div>
                <p>temperature {(weatherInformation.main.temp-273.15).toFixed(2)}° C</p>
                <img src={`https://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`}/>
                <p>wind {weatherInformation.wind.speed} m/s</p>
            </div>
        )}
        
    </div>
    )
}

export default DetailedView
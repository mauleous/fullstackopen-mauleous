import {useEffect, useState } from 'react'
import axios from 'axios'

const CountryPreview = ({selectedCountry}) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?' 
  const weatherIconUrl = ' https://openweathermap.org/img/wn/'
  
  const [capitalWeatherDetail, setCapitalWeatherDetail] = useState({})

  /* Load weather data */
  useEffect(() => {

    // If there is selected country, then get weather data
    if(Object.keys(selectedCountry).length > 0 && selectedCountry.constructor === Object ) {

      axios
        .get(`${weatherUrl}q=${selectedCountry.capital}&units=metric&APPID=${apiKey}`)
        .then(response => {
          setCapitalWeatherDetail(response.data)
        })
        .catch(error => {
          console.log('failed to get weather data', error)
        })
    }
    else {
      // Else, reset weather detail data
      setCapitalWeatherDetail({})
    }
    
  },[selectedCountry])
  
  /* Show country detail */
  const CountryDetail = () => {

    // If no selectedCountry, then don't render anything
    if(Object.keys(selectedCountry).length === 0 && selectedCountry.constructor === Object) {
      return null
    }

    // Otherwise, render the data
    return (
      <>
        <h1>{selectedCountry.name.common}</h1>
        <div>Capital: {selectedCountry.capital}</div>
        <div>Area: {selectedCountry.area}</div>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(selectedCountry.languages).map(([key,value]) => 
            <li key={key}>{value}</li> 
          )}
        </ul>
        <div>
          <img src={selectedCountry.flags.png} />
        </div>
      </>
    )
  }

  /* Show capital city weather */
  const CapitalWeather = () => {

    // If no weather data, then don't render
    if(Object.keys(capitalWeatherDetail).length === 0 && capitalWeatherDetail.constructor === Object) {
      return null
    }

    // Otherwise, render the data
    return (
      <>
        <h1>Weather in {selectedCountry.capital}</h1>
        <div>Temperature: {capitalWeatherDetail.main.temp} C</div>
        <div>
          <img src={`${weatherIconUrl}${capitalWeatherDetail.weather[0].icon}@2x.png`} />
        </div>
        <div>Wind: {capitalWeatherDetail.wind.speed} m/s</div>
      </>
    )
  }

  return (
    <>
      <CountryDetail />
      <CapitalWeather />
    </>
  )
}

export default CountryPreview
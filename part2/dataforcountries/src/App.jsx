import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryPreview from './components/CountryPreview'
import SearchResult from './components/SearchResult'

function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
  
  const [query,setQuery] = useState('')
  const [countries,setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})


  /* initial load */
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  },[])


  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  /* search when query changes */
  useEffect(() => {

    // Reset every search
    setSelectedCountries([])
    setSelectedCountry({})

    // Search only when there is query
    if (query != '') {
      const filtered = countries.filter((country) => { 
        const countryName = country.name.common
        return countryName.toLowerCase().includes(query)
      })

      setSelectedCountries(filtered)

      if(filtered.length == 1) {
        setSelectedCountry(filtered[0])
      }
    }    

  },[query])

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQuery}></input>
      </div>
      <SearchResult selectedCountries={selectedCountries} setSelectedCountry={setSelectedCountry} />
      <CountryPreview selectedCountry={selectedCountry} />
    </>
  )
}

export default App

const SearchResult = ({selectedCountries, setSelectedCountry}) => {
    
  // No match or has exact match
  if (selectedCountries.length <= 1) {
    return null
  }

  // Has match
  if(selectedCountries.length > 10) {
    // Too many results
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (selectedCountries.length <= 10 && selectedCountries.length > 1) {
    // Search result below 10
    return (
      <>
        {selectedCountries.map((country) => 
          <div key={country.cca2}>
            {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
          </div>)
        }
      </>
    )
  }    
}

export default SearchResult
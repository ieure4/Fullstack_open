import { useState, useEffect } from "react";
import axios from 'axios'
import NameList from "./components/NameList";

const App = ()=>{

const [search, setSearch] = useState('')
const [countriesObjects, setCountriesObjects] = useState([])
const [searchedArray, setSearchedArray] = useState([])

useEffect(()=>{
  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  .then(response=>(setCountriesObjects(response.data)))
}, [])

useEffect(()=>{
  const newArray = countriesObjects.filter((country)=>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  setSearchedArray(newArray)
}, [search, countriesObjects])

const handleInputChange = (event)=>{
  setSearch(event.target.value)
}


  return(
    <div>
        find countries <input onChange={handleInputChange}/><br/>
        <NameList searchedArray = {searchedArray}/>
    </div>
  )
}

export default App
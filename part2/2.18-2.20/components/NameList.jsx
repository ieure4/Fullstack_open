import axios from "axios"
import ShowButton from "./ShowButton"
import { useEffect, useState } from "react"
import DetailedView from "./DetailedView"

const NameList = ({searchedArray})=>{



const handleList = () =>{
   
 if(searchedArray.length <= 10 && searchedArray.length > 1){
        return(searchedArray.map((country)=>(
            <ShowButton key={country.cca3} country = {country} searchedArray={searchedArray}/>
    
)))
    }else if(searchedArray.length > 10){
        return(<p>Too many matches, specify another filter</p>)
    }else if(searchedArray.length === 1){
        const country = searchedArray[0]
        return(<DetailedView searchedArray={searchedArray} country = {country}/>)
    }else if(searchedArray.length===0){
        return(<p>No matches</p>)
    }
}

        return(
    <div>{handleList()}</div>
)

}

export default NameList
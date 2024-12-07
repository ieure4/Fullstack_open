import { useState } from "react"
import DetailedView from "./DetailedView";

const ShowButton = ({country})=>{

    const [showDetails, setShowDetails] = useState(false);

    const handleShow = ()=>{
        setShowDetails(s=>!s)
    }


    return (
        <div>
        <p>{country.name.common}</p>
        <button onClick={handleShow}>{showDetails?`hide`:`show`}</button>
        {showDetails&&(<DetailedView country={country}/>)}
        </div>
    )
}

export default ShowButton
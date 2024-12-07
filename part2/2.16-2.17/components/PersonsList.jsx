import {nanoid} from 'nanoid'
const PersonsList = ({filteredPersons, handleDelete})=>{
    
    return(
        <div>
        {filteredPersons.map(person => (
          <div key={person.id || nanoid()}>
            {person.name} {person.number} 
        <button onClick={(event)=>handleDelete(event,person)}>delete</button>
        </div>
        ))}
      </div>
    )
}
export default PersonsList
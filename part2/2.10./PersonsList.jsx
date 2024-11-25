
const PersonsList = ({filteredPersons})=>{
    
    return(
        <div>
        {filteredPersons.map((person, index) => (
          <p key={index}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    )
}
export default PersonsList
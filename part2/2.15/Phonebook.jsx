import {useState, useEffect} from 'react';
import Search from './Search'
import PersonsList from './PersonsList';
import AddPersons from './AddPersons';
import personsService from './services/people.js'

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Default', number: '000000000' }    
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch]=useState('');

  useEffect(()=>{
    personsService
    .getAll()
    .then(initialPersons=>{setPersons(initialPersons)})
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    const numberExists = persons.some((person) => person.number === newNumber);

    if (nameExists) {
      if(window.confirm(`${newName} is already added to the phonebook, replace number with a new one?`)){
        const updatedPerson = {name:newName, number:newNumber}
        const getid = persons.find(person=>person.name === newName).id
        personsService.update(updatedPerson, getid)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id===getid?returnedPerson:person))
        })
      }
    } else if (numberExists) {
      if(window.confirm(`The number ${newNumber} is already assigned to ${persons.find(person=>person.number === newNumber).name}.
         Do you wish to assign this number to ${newName}?`)){
          const updatedPerson = {name:newName, number:newNumber}
          const getid = persons.find(person=>person.number === newNumber).id
          personsService.update(updatedPerson, getid)
          .then(returnedPerson=>{
            setPersons(persons.map(person=>person.id===getid?returnedPerson:person))
          })
        }
    } else {
      const newPerson = {name: newName, number: newNumber}
      
      
      personsService
      .create(newPerson)
      .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))})

      setNewName('');
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }


  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (event, p)=>{
    event.preventDefault()
    if(window.confirm(`Delete ${p.name}?`)){
      personsService
      .remove(p.id)
      .then(()=>{
        setPersons(persons.filter(person=>p.id!=person.id));
      })
      .catch(error=>{
        `${p.name} could not be deleted`
        console.error(`Error deleting person:`, error)
      })
      
  }
}
    
    
  

  return (
    <div>
      <h2>Phonebook</h2> 
      <Search persons = {persons} search = {search} setSearch = {setSearch}/>
      <AddPersons addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <PersonsList filteredPersons={filteredPersons} handleDelete = {handleDelete}/>
      </div>
    </div>
  )
}

export default Phonebook;

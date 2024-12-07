import {useState, useEffect} from 'react';
import Search from './Search'
import PersonsList from './PersonsList';
import AddPersons from './AddPersons';
import personsService from './services/people.js'
import Notification from './ErrorMsg.jsx';

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Default', number: '000000000' }    
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch]=useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorCheck, setErrorCheck] = useState(true)
  useEffect(()=>{
    personsService
    .getAll()
    .then(initialPersons=>{setPersons(initialPersons)
      setErrorCheck(true)
    })
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
          setErrorCheck(true)
          setErrorMessage(`${newName} was assigned a new number`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        })
        .catch(error=>{
          setErrorCheck(false);
          setErrorMessage(`${newName} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setPersons(persons.filter(person=>p.id!=person.id))
        
        })
      }
    } else if (numberExists) {
      if(window.confirm(`The number ${newNumber} is already assigned to ${persons.find(person=>person.number === newNumber).name}.
         Do you wish to assign it to ${newName}?`)){
          const updatedPerson = {name:newName, number:newNumber}
          const getid = persons.find(person=>person.number === newNumber).id
          personsService.update(updatedPerson, getid)
          .then(returnedPerson=>{
            setPersons(persons.map(person=>person.id===getid?returnedPerson:person))
            setErrorCheck(true)
            setErrorMessage(`Assigned the new number to ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
        }
    } else {
      const newPerson = {name: newName, number: newNumber}
      
      
      personsService
      .create(newPerson)
      .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))
        setErrorCheck(true)
        setErrorMessage(`Added ${newName} to phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })

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
        setErrorCheck(false);
        setErrorMessage(`${p.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setPersons(persons.filter(person=>p.id!=person.id))
        
      })
      
  }
}
    
    
  

  return (
    <div>
      <h2>Phonebook</h2> 
      <Notification check ={errorCheck} message = {errorMessage}/>
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

import {useState} from 'react';
import Search from './Search'
import PersonsList from './PersonsList';
import AddPersons from './AddPersons';

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0723696907' }    
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch]=useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    const numberExists = persons.some((person) => person.number === newNumber);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else if (numberExists) {
      alert(`The number ${newNumber} is already added to the phonebook`);
    } else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
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

  

  return (
    <div>
      <h2>Phonebook</h2> 
      <Search persons = {persons} search = {search} setSearch = {setSearch}/>
      <AddPersons addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <PersonsList filteredPersons={filteredPersons}/>
      </div>
    </div>
  )
}

export default Phonebook;

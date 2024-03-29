import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = filter 
  ? persons.filter((person) => person.name.toLowerCase().includes(filter) )
  : persons

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // Check for duplicate
    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))

      // Reset form
      setNewName('')
      setNewNumber('')
    }

    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filter={filter} 
        handleFilter={handleFilter} 
      />

      <h3>Add a new</h3>
      <PersonForm 
        handleFormSubmit={handleFormSubmit}
        newName={newName} 
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App
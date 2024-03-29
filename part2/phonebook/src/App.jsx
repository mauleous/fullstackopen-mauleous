import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState()
  const [notifType, setNotifType] = useState('')

  const filteredPersons = filter 
  ? persons.filter((person) => person.name.toLowerCase().includes(filter) )
  : persons

  /* Load initial data from server */
  useEffect(() => {
    /*axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })*/

    personService.getPersons()
    .then((response) => {
      setPersons(response.data)
    })
    
  },[])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const resetForm = () => {    
    setNewName('')
    setNewNumber('')
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // Check for duplicate
    if(persons.some((person) => person.name === newName)) {

      const confirmUpdate = `${newName} is already added to phonebook, replace the old number with a new one?`
      
      if(window.confirm(confirmUpdate)) {
        const personBefore = persons.find((person) => person.name === newName)
        const personAfter = {...personBefore, "number" : newNumber}
        
        personService
          .updatePerson(personAfter.id, personAfter)
          .then(response => {
            const personReturned = response.data
            setPersons(persons.map(person => person.id === personReturned.id ? personReturned: person))
          })
          .catch(error => {
            console.log('failed to update person', error)
          })

        resetForm()
      }
      
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .addPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))

          setNotifMessage(`Added ${response.data.name}`)
          setNotifType('success')

          setTimeout(() => {
            setNotifMessage(null) 
          },5000)
        })

      resetForm()
    }
  }

  const handleDeletePerson = (personToBeDeleted) => {

    if(window.confirm(`Delete ${personToBeDeleted.name}?`)) {
      personService
        .deletePerson(personToBeDeleted.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
        })
        .catch(error => {
          if(error.response.status == '404') {
            setNotifType('error')
            setNotifMessage(`Information of ${personToBeDeleted.name} has already been removed from server`)

            setTimeout(() => {
              setNotifMessage(null) 
            },5000)
            setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notifMessage={notifMessage} notifType={notifType} />

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
      <Persons 
        persons={filteredPersons}         
        handleDeletePerson={handleDeletePerson}
      />

    </div>
  )
}

export default App
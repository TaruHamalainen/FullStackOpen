import { useState } from "react";
import Filter from "./components/filter";
import NewPersonForm from "./components/newPersonForm";
import Persons from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");
  const [filter, setFilter] = useState(false);

  const namesToFind = persons.filter((person) =>
    person.name.toLowerCase().includes(nameToFilter.toLowerCase())
  );

  const addNewPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    persons.map((person) => person.name).includes(person.name)
      ? alert(`${person.name} is already added to phonebook`)
      : setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setNameToFilter(event.target.value);
  };

  const handleFilterClick = () => {
    setFilter(!filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameToFilter={nameToFilter}
        onChange={handleFilterInputChange}
        filter={filter}
        click={handleFilterClick}
      />

      <h2>Add new Person</h2>

      <NewPersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInputChange}
        onNumberChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        nameToFilter={nameToFilter}
        namesToFind={namesToFind}
      />
    </div>
  );
};

export default App;

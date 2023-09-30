import { useEffect, useState } from "react";
import Filter from "./components/filter";
import NewPersonForm from "./components/newPersonForm";
import Persons from "./components/persons";
import server from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    server.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const namesToFind = persons.filter((person) =>
    person.name.toLowerCase().includes(nameToFilter.toLowerCase())
  );

  const addNewPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons
      .map((person) => person.name)
      .includes(person.name);

    if (!existingPerson) {
      server.add(person).then((response) => {
        setPersons(persons.concat(response.data));
      });
    } else {
      alert(`${person.name} has already added to phonebook`);
    }

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

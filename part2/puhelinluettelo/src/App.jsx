import { useEffect, useState } from "react";
import Filter from "./components/filter";
import NewPersonForm from "./components/newPersonForm";
import Persons from "./components/persons";
import Notifacation from "./components/notification";
import server from "./services/server";

const App = () => {
  // states
  const [persons, setPersons] = useState(null); // state for persons in phonebook
  const [newName, setNewName] = useState(""); // state for setting new name for person
  const [newNumber, setNewNumber] = useState(""); // state for setting new number for person
  const [nameToFilter, setNameToFilter] = useState(""); // state for filtering persons
  const [filter, setFilter] = useState(false); // state for hide / show filter input
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // load initial phonebook
  useEffect(() => {
    server.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  if (!persons) return null;

  // setting list for filtering names
  const namesToFind = persons.filter((person) =>
    person.name.toLowerCase().includes(nameToFilter.toLowerCase())
  );

  // adding new person to phone book
  const addNewPerson = (event) => {
    event.preventDefault();

    // new person to add to phonebook
    const person = {
      name: newName,
      number: newNumber,
    };

    // is person existing already in phonebook?
    const existingPerson = persons
      .map((person) => person.name)
      .includes(person.name);

    // if person is not in  phonebook, add person
    if (!existingPerson) {
      server.add(person).then((response) => {
        setPersons(persons.concat(response.data));
        setMessageType("success");
        setMessage(`${person.name} was added to phonebook`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });

      // if person exists in phonebook and user confirms to edit number
    } else {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace old number with new one (${person.number})?`
        )
      ) {
        const personToChange = persons.find((p) => p.name === person.name);
        const changedPerson = { ...personToChange, number: person.number };

        // update number for existing person

        server
          .update(personToChange.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== personToChange.id ? p : response.data
              )
            );
            setMessageType("success");
            setMessage(`${personToChange.name} number was updated`);

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log("error");
            setMessageType(null);
            setMessage(`${person.name} was already deleted from server`);

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }

    // reset inputs
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

  // delete person from phonebook
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete${name} from phonebook?`)) {
      server.remove(id);
      setMessageType("success");
      setMessage(`${name} was removed from phonebook`);
      const newPersonsList = persons.filter((person) => person.id !== id);
      setPersons(newPersonsList);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifacation message={message} messageType={messageType} />
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
        handleClick={handleDelete}
      />
    </div>
  );
};

export default App;

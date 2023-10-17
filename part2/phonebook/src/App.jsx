import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Filter from "./components/Filter";

import Persons from "./components/Persons";

import server from "./services/server";
import Message from "./components/Message";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    server.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const namesToFind = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Filter filter={filter} setFilter={setFilter} />
      {message ? <Message message={message} /> : null}

      <AddForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <Persons
        persons={persons}
        namesToFind={namesToFind}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
}

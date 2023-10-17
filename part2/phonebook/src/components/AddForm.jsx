import React from "react";
import { useState } from "react";
import server from "../services/server";
import Message from "./Message";

export default function AddForm({ persons, setPersons, setMessage }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = {
      name: name,
      number: number,
    };

    const isInBook = persons.map((person) => person.name).includes(person.name);

    if (!isInBook) {
      server.add(person).then((res) => {
        setPersons(persons.concat(res.data));
        setMessage(`${person.name} was added to phonebook`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace old number with new one? (${person.number}) `
        )
      ) {
        const personToChange = persons.find((p) => p.name === person.name);
        const changedPerson = { ...personToChange, number: person.number };

        server.update(personToChange.id, changedPerson).then((res) => {
          setPersons(
            persons.map((p) => (p.id !== personToChange.id ? p : res.data))
          );
          setMessage(`${personToChange.name}'s number was updated`);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      }
    }

    reset();
  };

  return (
    <div className=" max-w-lg mx-auto mb-8 bg-slate-100 p-5 rounded-lg ">
      <h3 className="text-center text-2xl mb-6">Add contacts</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          className="border p-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="name"
          value={name}
          autoComplete="off"
          onChange={handleNameChange}
        />
        <input
          className="border p-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="number"
          value={number}
          autoComplete="off"
          onChange={handleNumberChange}
        />

        <button className="bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          add
        </button>
      </form>
    </div>
  );
}

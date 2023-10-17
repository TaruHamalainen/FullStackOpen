import React from "react";
import Person from "./Person";

export default function Persons({
  persons,
  filter,
  namesToFind,
  setPersons,
  setMessage,
}) {
  return (
    <div className="max-w-lg p-3 mx-auto flex flex-col gap-4 mb-8 ">
      {!filter === ""
        ? persons.map((person) => <Person key={person.name} person={person} />)
        : namesToFind.map((person) => (
            <Person
              key={person.name}
              person={person}
              persons={persons}
              setPersons={setPersons}
              setMessage={setMessage}
            />
          ))}
      {/* {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))} */}
    </div>
  );
}

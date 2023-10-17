import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import server from "../services/server";

export default function Person({ person, persons, setPersons, setMessage }) {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete${name} from phonebook?`)) {
      server.remove(id);
      const newPersonsList = persons.filter((person) => person.id !== id);
      setPersons(newPersonsList);
      setMessage(`${name} was removed from phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  return (
    <div className="flex justify-between bg-slate-50  shadow-md p-3 rounded-lg">
      <div>
        <div className="flex items-center gap-2">
          <BsFillPersonFill className="self-center text-sm text-slate-700" />
          <p>{person.name}</p>
        </div>
        <div className="flex items-center gap-2 ">
          <FaPhoneAlt className="text-sm text-slate-700" />
          <p>{person.number}</p>
        </div>
      </div>
      <button onClick={() => handleDelete(person.id, person.name)}>
        <AiFillDelete className="text-2xl text-red-700" />
      </button>
    </div>
  );
}

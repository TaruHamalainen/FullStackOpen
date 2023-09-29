import Person from "./person";

const Persons = ({ persons, nameToFilter, namesToFind }) => {
  return (
    <ul>
      {!nameToFilter
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))
        : namesToFind.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
    </ul>
  );
};

export default Persons;

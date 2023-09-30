import Person from "./person";

const Persons = ({ persons, nameToFilter, namesToFind, handleClick }) => {
  return (
    <ul>
      {!nameToFilter
        ? persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleClick={() => handleClick(person.id, person.name)}
            />
          ))
        : namesToFind.map((person) => (
            <Person key={person.id} person={person} />
          ))}
    </ul>
  );
};

export default Persons;

import Person from "./person";

const Persons = ({ persons, nameToFilter, namesToFind }) => {
  return (
    <ul>
      {!nameToFilter
        ? persons.map((person) => <Person key={person.id} person={person} />)
        : namesToFind.map((person) => (
            <Person key={person.id} person={person} />
          ))}
    </ul>
  );
};

export default Persons;

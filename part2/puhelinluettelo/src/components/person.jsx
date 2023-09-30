const Person = ({ person, handleClick }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleClick}>Delete</button>
    </li>
  );
};
export default Person;

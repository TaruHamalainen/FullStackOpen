const NewPersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name: </label>
        <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        <label>Number: </label>
        <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPersonForm;

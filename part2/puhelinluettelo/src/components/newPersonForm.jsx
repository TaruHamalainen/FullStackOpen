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
        <label htmlFor="name">Name: </label>
        <input
          autoComplete="off"
          id="name"
          value={newName}
          onChange={onNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          autoComplete="off"
          id="number"
          value={newNumber}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPersonForm;

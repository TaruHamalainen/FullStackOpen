const Filter = ({ nameToFilter, onChange, filter, click }) => {
  return (
    <div>
      {filter ? (
        <div>
          <label htmlFor="filter">Filter: </label>
          <input
            autoComplete="off"
            id="filter"
            value={nameToFilter}
            onChange={onChange}
          />
          <button onClick={click}>close filter</button>
        </div>
      ) : (
        <button onClick={click}>Open filter</button>
      )}
    </div>
  );
};

export default Filter;

const Filter = ({ nameToFilter, onChange }) => {
  return (
    <div>
      <label>Filter shown with:</label>
      <input value={nameToFilter} onChange={onChange} />
    </div>
  );
};

export default Filter;

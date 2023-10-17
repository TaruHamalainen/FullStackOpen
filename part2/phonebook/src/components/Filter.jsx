import React, { useState } from "react";

export default function Filter({ setFilter, filter }) {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="max-w-lg mx-auto mb-1 p-3">
      <p className="text-center">Filter shown with</p>
      <input
        className="border p-3 rounded-lg w-full focus:outline-none"
        type="text"
        placeholder="search"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
}

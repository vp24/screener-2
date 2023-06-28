import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [stockQuery, setStockQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (stockQuery.trim() === '') return;
    onSearch(stockQuery);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={stockQuery}
        onChange={(e) => setStockQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;

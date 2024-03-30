import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const [stockQuery, setStockQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (stockQuery.trim() === '') return;
    onSearch(stockQuery);
  };

  return (
    <Box component="form" onSubmit={handleSearch} display="flex" alignItems="center" mb={4}>
      <TextField
        label="Enter stock ticker"
        variant="outlined"
        value={stockQuery}
        onChange={(e) => setStockQuery(e.target.value)}
        fullWidth
        style={{ marginRight: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
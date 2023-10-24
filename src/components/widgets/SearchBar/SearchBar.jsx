import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  const { options } = props;
  console.log(options);
  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search..."
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              '& .MuiInputBase-input': { boxShadow: 'none' },
              width: '100%',
              minWidth: '600px',
            },
          }}
          // Disables autofilling from Google Chrome
          name={`random_${Math.random()}`}
        />
      )}
    />
  );
};

export default SearchBar;

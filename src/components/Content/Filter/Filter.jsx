import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/contacts/slices/filterSlice';
import { getFilter } from 'redux/contacts/selectors';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleInputChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleClear = () => {
    dispatch(setFilter(''));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        type="text"
        name="search"
        value={filter || ''}
        onChange={handleInputChange}
        placeholder="Find contacts by name..."
        label="Search Contacts"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#38bdf8' }} />
            </InputAdornment>
          ),
          endAdornment: filter ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small" sx={{ color: '#94a3b8' }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            borderRadius: '14px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
            '&:hover fieldset': { borderColor: '#38bdf8' },
            '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
          },
          '& .MuiInputLabel-root': { color: '#94a3b8' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
        }}
      />
    </Box>
  );
};

export default Filter;

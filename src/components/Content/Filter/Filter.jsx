import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/contacts/slices/filterSlice';
import { getFilter } from 'redux/contacts/selectors';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

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
        placeholder="Filter by name or letter..."
        label="Search Directory"
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
            </InputAdornment>
          ),
          endAdornment: filter ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small" sx={{ color: '#94a3b8' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            borderRadius: '10px',
            backgroundColor: '#161925',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
          },
          '& .MuiInputLabel-root': { color: '#94a3b8', fontSize: '0.9rem' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
        }}
      />
    </Box>
  );
};

export default Filter;

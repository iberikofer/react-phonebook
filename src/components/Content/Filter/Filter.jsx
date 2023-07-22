import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/contacts/slices/filterSlice';
import { TextField } from '@mui/material';

const Filter = () => {
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Find contacts by letters</h3>
      <TextField
        type="text"
        name="search"
        onChange={handleInputChange}
        style={{ width: '70%', borderRadius: 15, marginTop: 20 }}
        id="standard-basic"
        label="Filter"
        variant="standard"
      />
    </div>
  );
};

export default Filter;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddIcon from '@mui/icons-material/Add';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const checkPhonebookName =
      Array.isArray(contacts) &&
      contacts.find(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      );

    if (checkPhonebookName) {
      window.alert(`${name} is already in your contacts.`);
      return;
    }

    dispatch(addContact({ name: name.trim(), number: number.trim() }));
    setName('');
    setNumber('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        fullWidth
        required
        label="Name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Adrian Soprano"
        variant="outlined"
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$",
          title: "Name may contain only letters, apostrophe, dash and spaces.",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: '#a855f7' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            borderRadius: '14px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
            '&:hover fieldset': { borderColor: '#a855f7' },
            '&.Mui-focused fieldset': { borderColor: '#a855f7' },
          },
          '& .MuiInputLabel-root': { color: '#94a3b8' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#c084fc' },
        }}
      />

      <TextField
        fullWidth
        required
        type="tel"
        label="Phone Number"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="+380 97 123 4567"
        variant="outlined"
        inputProps={{
          pattern: "\\+?\\d{1,4}?[\\-.\\s]?\\(?\\d{1,3}?\\)?[\\-.\\s]?\\d{1,4}[\\-.\\s]?\\d{1,4}[\\-.\\s]?\\d{1,9}",
          title: "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneIcon sx={{ color: '#a855f7' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
            borderRadius: '14px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
            '&:hover fieldset': { borderColor: '#a855f7' },
            '&.Mui-focused fieldset': { borderColor: '#a855f7' },
          },
          '& .MuiInputLabel-root': { color: '#94a3b8' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#c084fc' },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          py: 1.4,
          borderRadius: '14px',
          textTransform: 'none',
          fontWeight: 800,
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #9333ea, #db2777)',
            boxShadow: '0 10px 28px rgba(168, 85, 247, 0.55)',
          },
        }}
      >
        Add Contact
      </Button>

      <Alert
        severity="info"
        sx={{
          mt: 1,
          borderRadius: '12px',
          backgroundColor: 'rgba(56, 189, 248, 0.1) !important',
          color: '#93c5fd !important',
          border: '1px solid rgba(56, 189, 248, 0.2) !important',
          fontSize: '0.825rem',
          boxShadow: 'none !important',
          '&:hover': {
            backgroundColor: 'rgba(56, 189, 248, 0.1) !important',
            borderColor: 'rgba(56, 189, 248, 0.2) !important',
            boxShadow: 'none !important',
            transform: 'none !important',
          },
          '& .MuiAlert-icon': { color: '#38bdf8' },
        }}
      >
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
          Tip: Avoid rapid duplicate operations to prevent server rate limits.
        </Typography>
      </Alert>
    </Box>
  );
};

export default ContactForm;

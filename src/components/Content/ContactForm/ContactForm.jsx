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
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
      window.alert(`${name} is already recorded in your contacts.`);
      return;
    }

    dispatch(addContact({ name: name.trim(), number: number.trim() }));
    setName('');
    setNumber('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
      <TextField
        fullWidth
        required
        label="Contact Name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Adrian Soprano"
        variant="outlined"
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$",
          title: "Name may contain only letters, apostrophe, dash and spaces.",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
            </InputAdornment>
          ),
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

      <TextField
        fullWidth
        required
        type="tel"
        label="Telephone Number"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="e.g. +380 (97) 123-4567"
        variant="outlined"
        inputProps={{
          pattern: "\\+?\\d{1,4}?[\\-.\\s]?\\(?\\d{1,3}?\\)?[\\-.\\s]?\\d{1,4}[\\-.\\s]?\\d{1,4}[\\-.\\s]?\\d{1,9}",
          title: "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneOutlinedIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
            </InputAdornment>
          ),
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          mt: 0.5,
          py: 1.35,
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.95rem',
          backgroundColor: '#f59e0b',
          color: '#0c0d12',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
          '&:hover': {
            backgroundColor: '#d97706',
            boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)',
          },
        }}
      >
        Record Contact in Ledger
      </Button>

      {/* Directory Entry Note */}
      <Box
        sx={{
          p: 1.75,
          borderRadius: '10px',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#fbbf24',
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          ENTRY GUIDELINES
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', lineHeight: 1.5, fontSize: '0.78rem' }}>
          Names are indexed alphabetically in the directory. You can use international formatting with country and area codes.
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactForm;

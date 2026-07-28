import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  loadingStatus,
  errorMesage,
} from 'redux/contacts/selectors';
import { fetchContacts, deleteContact } from 'redux/contacts/operations';
import Loader from 'components/Loader/Loader';
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  IconButton,
  Button,
  Alert,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const ContactList = () => {
  const contacts = useSelector(getContacts) || [];
  const filter = useSelector(getFilter) || '';
  const isLoading = useSelector(loadingStatus);
  const error = useSelector(errorMesage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  // Case-insensitive filtering
  const filteredContacts = contacts.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase().trim())
  );

  const getInitials = name => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Generate deterministic gradient background for avatar based on name string
  const getAvatarGradient = name => {
    const gradients = [
      'linear-gradient(135deg, #6366f1, #a855f7)',
      'linear-gradient(135deg, #38bdf8, #6366f1)',
      'linear-gradient(135deg, #ec4899, #f43f5e)',
      'linear-gradient(135deg, #10b981, #059669)',
      'linear-gradient(135deg, #f59e0b, #d97706)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  if (isLoading && contacts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          borderRadius: '14px',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#fca5a5',
        }}
      >
        Failed to load contacts: {error}
      </Alert>
    );
  }

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          color: '#94a3b8',
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#64748b',
          }}
        >
          <PersonOutlineIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#e2e8f0' }}>
          No contacts yet
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: '300px' }}>
          Add your first contact using the form on the left!
        </Typography>
      </Box>
    );
  }

  if (filteredContacts.length === 0 && filter) {
    return (
      <Box
        sx={{
          py: 5,
          px: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          color: '#94a3b8',
        }}
      >
        <SentimentDissatisfiedIcon sx={{ fontSize: 40, color: '#64748b' }} />
        <Typography variant="body1" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
          No contacts match "{filter}"
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0, mt: 1 }}>
      {filteredContacts.map((contact, index) => (
        <ListItem
          key={contact.id || contact._id || `contact-${index}`}
          sx={{
            p: 2,
            borderRadius: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            transition: 'all 0.25s ease',
            '&:hover': {
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {/* Avatar & Contact Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                fontWeight: 700,
                fontSize: '1rem',
                background: getAvatarGradient(contact.name),
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
              }}
            >
              {getInitials(contact.name)}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: '#f8fafc',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {contact.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#94a3b8',
                  fontSize: '0.875rem',
                  mt: 0.25,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <LocalPhoneIcon sx={{ fontSize: '0.9rem', color: '#38bdf8' }} />
                {contact.number}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Button
              component="a"
              href={`tel:${contact.number}`}
              size="small"
              sx={{
                minWidth: 'auto',
                p: '6px 12px',
                borderRadius: '10px',
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                },
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Call
            </Button>

            <IconButton
              onClick={() => onDelete(contact.id)}
              size="small"
              sx={{
                color: '#f87171',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '10px',
                p: '8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  transform: 'scale(1.05)',
                },
              }}
              title="Delete Contact"
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;

import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
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
  Avatar,
  IconButton,
  Button,
  Alert,
  Tooltip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { Contact } from '../../../types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ContactList = () => {
  const rawContacts = useAppSelector(getContacts);
  const contacts: Contact[] = useMemo(() => rawContacts || [], [rawContacts]);
  const filter = useAppSelector(getFilter) || '';
  const isLoading = useAppSelector(loadingStatus);
  const error = useAppSelector(errorMesage);
  const dispatch = useAppDispatch();

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDelete = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  const handleCopy = (id: string, number: string) => {
    navigator.clipboard?.writeText(number);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Letters present in existing contacts
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    contacts.forEach(c => {
      const first = (c.name || '').trim().charAt(0).toUpperCase();
      if (first) letters.add(first);
    });
    return letters;
  }, [contacts]);

  // Filter contacts by search string & selected letter
  const filteredContacts = useMemo(() => {
    return contacts
      .filter(contact => {
        const matchesSearch = (contact?.name || '')
          .toLowerCase()
          .includes(filter.toLowerCase().trim());
        if (!matchesSearch) return false;

        if (selectedLetter) {
          const firstLetter = (contact?.name || '').trim().charAt(0).toUpperCase();
          return firstLetter === selectedLetter;
        }

        return true;
      })
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }, [contacts, filter, selectedLetter]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};
    filteredContacts.forEach(contact => {
      const first = (contact.name || '').trim().charAt(0).toUpperCase() || '#';
      if (!groups[first]) groups[first] = [];
      groups[first].push(contact);
    });
    return groups;
  }, [filteredContacts]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Dignified mineral color palette for contact avatars
  const getAvatarStyle = (name: string) => {
    const palette = [
      { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' }, // Amber
      { bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.4)' }, // Sky
      { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.4)' }, // Emerald
      { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },   // Rose
      { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.4)' }, // Violet
      { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.4)' }, // Teal
    ];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % palette.length;
    return palette[idx];
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
          borderRadius: '10px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#fca5a5',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        Failed to load directory records: {error}
      </Alert>
    );
  }

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          py: 7,
          px: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          color: '#94a3b8',
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px dashed rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar
          sx={{
            width: 52,
            height: 52,
            bgcolor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            color: '#fbbf24',
          }}
        >
          <MenuBookOutlinedIcon fontSize="medium" />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
          Your Phonebook Ledger is Empty
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: '340px', lineHeight: 1.6 }}>
          No entries found. Inscribe your first contact using the form on the left to start your directory.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Directory Status Bar & A-Z Tabs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Status indicator line */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94a3b8',
              letterSpacing: '0.04em',
              fontSize: '0.75rem',
            }}
          >
            INDEXED RECORDS: <Box component="span" sx={{ color: '#fbbf24', fontWeight: 700 }}>{filteredContacts.length}</Box> OF {contacts.length}
          </Typography>

          {selectedLetter && (
            <Button
              size="small"
              onClick={() => setSelectedLetter(null)}
              sx={{
                p: '2px 8px',
                fontSize: '0.72rem',
                color: '#fbbf24',
                fontFamily: "'JetBrains Mono', monospace",
                minWidth: 'auto',
                '&:hover': { background: 'rgba(245, 158, 11, 0.1)' },
              }}
            >
              Clear Tab [{selectedLetter}] ×
            </Button>
          )}
        </Box>

        {/* Rolodex A–Z Tab Strip */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            overflowX: 'auto',
            pb: 0.5,
            '&::-webkit-scrollbar': { height: 4 },
          }}
        >
          <Box
            onClick={() => setSelectedLetter(null)}
            sx={{
              px: 1.25,
              py: 0.4,
              borderRadius: '6px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              userSelect: 'none',
              bgcolor: selectedLetter === null ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)',
              color: selectedLetter === null ? '#0c0d12' : '#94a3b8',
              border: selectedLetter === null ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.15s ease',
              '&:hover': {
                borderColor: 'rgba(245, 158, 11, 0.5)',
                color: selectedLetter === null ? '#0c0d12' : '#f8fafc',
              },
            }}
          >
            ALL
          </Box>

          {ALPHABET.map(letter => {
            const hasContacts = availableLetters.has(letter);
            const isSelected = selectedLetter === letter;

            return (
              <Box
                key={letter}
                onClick={() => hasContacts && setSelectedLetter(isSelected ? null : letter)}
                sx={{
                  minWidth: 26,
                  height: 26,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: hasContacts ? 'pointer' : 'default',
                  userSelect: 'none',
                  bgcolor: isSelected
                    ? '#f59e0b'
                    : hasContacts
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'transparent',
                  color: isSelected
                    ? '#0c0d12'
                    : hasContacts
                    ? '#fbbf24'
                    : '#475569',
                  border: isSelected
                    ? '1px solid #f59e0b'
                    : hasContacts
                    ? '1px solid rgba(245, 158, 11, 0.25)'
                    : '1px solid transparent',
                  opacity: hasContacts ? 1 : 0.4,
                  transition: 'all 0.15s ease',
                  '&:hover': hasContacts
                    ? {
                        borderColor: '#f59e0b',
                        color: isSelected ? '#0c0d12' : '#ffffff',
                        transform: 'translateY(-1px)',
                      }
                    : {},
                }}
              >
                {letter}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* No Matches Filter Alert */}
      {filteredContacts.length === 0 && (
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
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '10px',
            border: '1px dashed rgba(255, 255, 255, 0.08)',
          }}
        >
          <SearchOffIcon sx={{ fontSize: 36, color: '#64748b' }} />
          <Typography variant="body2" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
            No directory records match your filter criteria.
          </Typography>
        </Box>
      )}

      {/* Grouped Alphabetical Ledger Entries */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.keys(groupedContacts).map(letterGroup => (
          <Box key={letterGroup} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Letter Header Index Divider */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                pt: 1,
                pb: 0.5,
              }}
            >
              <Box
                sx={{
                  px: 1.25,
                  py: 0.2,
                  borderRadius: '4px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  bgcolor: 'rgba(245, 158, 11, 0.12)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                }}
              >
                {letterGroup}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  height: '1px',
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#64748b',
                  fontSize: '0.7rem',
                }}
              >
                {groupedContacts[letterGroup].length} {groupedContacts[letterGroup].length === 1 ? 'entry' : 'entries'}
              </Typography>
            </Box>

            {/* Entries in this section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {groupedContacts[letterGroup].map((contact, index) => {
                const avatarStyle = getAvatarStyle(contact.name);
                const contactId = contact.id || contact._id || `contact-${index}`;
                const isCopied = copiedId === contactId;

                return (
                  <Box
                    key={contactId}
                    sx={{
                      p: 1.5,
                      borderRadius: '10px',
                      backgroundColor: '#161925',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        backgroundColor: '#1b1f2e',
                        borderColor: 'rgba(245, 158, 11, 0.35)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                      },
                    }}
                  >
                    {/* Contact Avatar & Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          bgcolor: avatarStyle.bg,
                          color: avatarStyle.text,
                          border: `1px solid ${avatarStyle.border}`,
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(contact.name)}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: '#f8fafc',
                            lineHeight: 1.25,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.925rem',
                          }}
                        >
                          {contact.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
                          <LocalPhoneIcon sx={{ fontSize: '0.85rem', color: '#64748b' }} />
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#94a3b8',
                              fontSize: '0.85rem',
                              fontFamily: "'JetBrains Mono', monospace",
                              letterSpacing: '0.02em',
                            }}
                          >
                            {contact.number}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Action Buttons: Dial, Copy, Delete */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                      <Tooltip title="Call Number" arrow>
                        <Button
                          component="a"
                          href={`tel:${contact.number}`}
                          size="small"
                          startIcon={<LocalPhoneIcon sx={{ fontSize: '0.9rem !important' }} />}
                          sx={{
                            minWidth: 'auto',
                            p: '4px 10px',
                            borderRadius: '6px',
                            color: '#38bdf8',
                            backgroundColor: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            '&:hover': {
                              backgroundColor: 'rgba(56, 189, 248, 0.18)',
                              borderColor: '#38bdf8',
                            },
                            display: { xs: 'none', sm: 'inline-flex' },
                          }}
                        >
                          Dial
                        </Button>
                      </Tooltip>

                      <Tooltip title={isCopied ? 'Copied!' : 'Copy Number'} arrow>
                        <IconButton
                          onClick={() => handleCopy(contactId, contact.number)}
                          size="small"
                          sx={{
                            color: isCopied ? '#34d399' : '#94a3b8',
                            backgroundColor: isCopied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: isCopied ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '6px',
                            p: '6px',
                            transition: 'all 0.15s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: '#f8fafc',
                            },
                          }}
                        >
                          {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete from Ledger" arrow>
                        <IconButton
                          onClick={() => onDelete(contactId)}
                          size="small"
                          sx={{
                            color: '#f87171',
                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '6px',
                            p: '6px',
                            transition: 'all 0.15s ease',
                            '&:hover': {
                              backgroundColor: '#ef4444',
                              color: '#ffffff',
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContactList;

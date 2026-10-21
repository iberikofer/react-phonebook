import type { FC } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const Content: FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Grid container spacing={3.5}>
        {/* Left Side: Contact Form Card */}
        <Grid item xs={12} md={4.5}>
          <Paper
            elevation={0}
            className="phonebook-card"
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              position: 'sticky',
              top: 80,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonAddAlt1Icon sx={{ color: '#fbbf24', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.2 }}>
                  Inscribe New Contact
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  FORM // SECTION 01
                </Typography>
              </Box>
            </Box>

            <ContactForm />
          </Paper>
        </Grid>

        {/* Right Side: Filter & Contact List Card */}
        <Grid item xs={12} md={7.5}>
          <Paper
            elevation={0}
            className="phonebook-card"
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              minHeight: '520px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
                pb: 1.5,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ImportContactsIcon sx={{ color: '#38bdf8', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', fontSize: '1.05rem', lineHeight: 1.2 }}>
                    Directory Records
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    ALPHABETICAL LEDGER
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Filter />
            <ContactList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;

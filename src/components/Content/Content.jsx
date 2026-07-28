import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ContactsIcon from '@mui/icons-material/Contacts';

const Content = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Grid container spacing={4}>
        {/* Left Side: Contact Form Card */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            className="glass-card"
            sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                }}
              >
                <PersonAddAlt1Icon sx={{ color: '#fff', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Add New Contact
              </Typography>
            </Box>

            <ContactForm />
          </Paper>
        </Grid>

        {/* Right Side: Filter & Contact List Card */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            className="glass-card"
            sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', gap: 3, minHeight: '480px' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)',
                }}
              >
                <ContactsIcon sx={{ color: '#fff', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                My Phonebook Contacts
              </Typography>
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

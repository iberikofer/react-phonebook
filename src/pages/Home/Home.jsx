import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from 'hooks/index';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Home = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 }, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto',
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Chip
          icon={<ContactPhoneIcon sx={{ color: '#c084fc !important', fontSize: '1.1rem !important' }} />}
          label="Personal Contact Manager"
          sx={{
            mb: 3,
            py: 2,
            px: 1,
            borderRadius: '20px',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            color: '#e9d5ff',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '3.2rem', md: '3.8rem' },
            lineHeight: 1.15,
            mb: 3,
            background: 'linear-gradient(135deg, #ffffff 30%, #a855f7 70%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {isLoggedIn ? (
            <>
              Welcome back,{' '}
              <Box component="span" sx={{ color: '#38bdf8', WebkitTextFillColor: '#38bdf8' }}>
                {user?.name || 'User'}
              </Box>
              !
            </>
          ) : (
            'Organize & Access Your Contacts Anytime'
          )}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#94a3b8',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            mb: 4,
            maxWidth: '650px',
            lineHeight: 1.6,
          }}
        >
          {isLoggedIn
            ? 'Your phonebook is ready. Easily manage, filter, or add new phone numbers to your personal directory.'
            : 'A modern, fast, and secure phonebook application powered by Redux Toolkit and React Router.'}
        </Typography>

        {/* Hero Actions */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {isLoggedIn ? (
            <Button
              component={RouterLink}
              to="/contacts"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1.05rem',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5, #9333ea, #db2777)',
                  boxShadow: '0 12px 30px rgba(168, 85, 247, 0.55)',
                },
              }}
            >
              Go to My Contacts
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                startIcon={<PersonAddIcon />}
                sx={{
                  py: 1.5,
                  px: 3.5,
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                    boxShadow: '0 12px 30px rgba(99, 102, 241, 0.55)',
                  },
                }}
              >
                Create Account
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  px: 3.5,
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  color: '#38bdf8',
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  '&:hover': {
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  },
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Feature Highlights Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            className="glass-card"
            sx={{
              p: 3.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SpeedIcon fontSize="medium" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Instant Search & Filter
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
              Quickly find any contact in your list with real-time substring filtering by name.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            className="glass-card"
            sx={{
              p: 3.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'rgba(168, 85, 247, 0.15)',
                color: '#c084fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SecurityIcon fontSize="medium" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Personal & Secure Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
              JWT authentication keeps your contacts synchronized and private to your personal user account.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            className="glass-card"
            sx={{
              p: 3.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'rgba(236, 72, 153, 0.15)',
                color: '#f472b6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FilterAltIcon fontSize="medium" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Easy Contact Management
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
              Add new entries or remove unwanted contacts with a single click, synchronized with REST API backend.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

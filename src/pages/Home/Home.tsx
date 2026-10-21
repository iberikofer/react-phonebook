import type { FC } from 'react';
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
  Avatar,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Home: FC = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 6 }, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '820px',
          mx: 'auto',
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Chip
          icon={<MenuBookIcon sx={{ color: '#fbbf24 !important', fontSize: '1rem !important' }} />}
          label="PERSONAL DIRECTORY LEDGER"
          sx={{
            mb: 2.5,
            py: 1.8,
            px: 1.5,
            borderRadius: '8px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            color: '#fde68a',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.1rem', sm: '3rem', md: '3.6rem' },
            lineHeight: 1.15,
            mb: 2.5,
            color: '#f8fafc',
            letterSpacing: '-0.035em',
          }}
        >
          {isLoggedIn ? (
            <>
              Welcome to Your Directory,{' '}
              <Box component="span" sx={{ color: '#fbbf24' }}>
                {user?.name || 'User'}
              </Box>
            </>
          ) : (
            'The Tactile Phonebook for Your Personal Contacts'
          )}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#94a3b8',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.18rem' },
            mb: 4,
            maxWidth: '640px',
            lineHeight: 1.6,
          }}
        >
          {isLoggedIn
            ? 'Your directory is ready. Inscribe new entries, filter alphabetically, or call contacts with a single click.'
            : 'An elegantly crafted address ledger with alphabetical indexing, instant filtering, and secure cloud synchronization.'}
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
                py: 1.4,
                px: 3.5,
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1rem',
                backgroundColor: '#f59e0b',
                color: '#0c0d12',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                '&:hover': {
                  backgroundColor: '#d97706',
                  boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                },
              }}
            >
              Open Contact Directory
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
                  py: 1.4,
                  px: 3.5,
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  backgroundColor: '#f59e0b',
                  color: '#0c0d12',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                  '&:hover': {
                    backgroundColor: '#d97706',
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                  },
                }}
              >
                Create Directory Account
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.4,
                  px: 3.5,
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  color: '#e2e8f0',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Interactive Rolodex / Ledger Preview Card */}
      <Paper
        className="phonebook-card"
        sx={{
          p: { xs: 2.5, sm: 4 },
          maxWidth: '820px',
          mx: 'auto',
          mb: 6,
          background: 'linear-gradient(180deg, #161924 0%, #11131c 100%) !important',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ledger Header Strip */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
            mb: 2.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#10b981',
                boxShadow: '0 0 10px #10b981',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.825rem',
                color: '#94a3b8',
                letterSpacing: '0.04em',
              }}
            >
              DIRECTORY PREVIEW // A–Z INDEX
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {['A', 'B', 'M', 'S'].map(letter => (
              <Box
                key={letter}
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: '4px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  bgcolor: letter === 'A' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: letter === 'A' ? '#fbbf24' : '#64748b',
                  border: letter === 'A' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                }}
              >
                {letter}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sample Ledger Entries */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[
            {
              name: 'Alexander Graham Bell',
              number: '+1 (202) 555-0143',
              tag: 'Inventor',
              color: '#d97706',
              bg: 'rgba(245, 158, 11, 0.15)',
            },
            {
              name: 'Elena Rostova',
              number: '+380 (50) 123-4567',
              tag: 'Mobile',
              color: '#0284c7',
              bg: 'rgba(56, 189, 248, 0.15)',
            },
            {
              name: 'Marcus Vance',
              number: '+44 20 7946 0991',
              tag: 'Direct',
              color: '#059669',
              bg: 'rgba(16, 185, 129, 0.15)',
            },
          ].map((item, idx) => (
            <Box
              key={idx}
              sx={{
                p: 1.5,
                borderRadius: '10px',
                bgcolor: '#191d2b',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    bgcolor: item.bg,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
                    <LocalPhoneIcon sx={{ fontSize: '0.85rem', color: '#64748b' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#94a3b8',
                        fontSize: '0.825rem',
                      }}
                    >
                      {item.number}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  px: 1.25,
                  py: 0.4,
                  borderRadius: '6px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {item.tag}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Crafted Architectural Pillars */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            className="phonebook-card"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SortByAlphaIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
              Alphabetical Rolodex Index
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
              Browse your contacts through interactive A–Z alphabetical tabs or real-time character substring search.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            className="phonebook-card"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VpnKeyOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
              Synchronized Cloud Ledger
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
              Your private address book is encrypted and persisted with secure JWT tokens across sessions.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            className="phonebook-card"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneForwardedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
              Quick Dial & Copy
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
              One-click telephone link initiation and clipboard copy with tactile visual confirmation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

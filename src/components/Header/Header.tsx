import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/index';
import UserMenu from 'components/UserMenu/UserMenu';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Container, Box, Typography } from '@mui/material';

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Header Bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          background: 'rgba(20, 23, 33, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          py: 1.25,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Brand Logo & Name */}
            <Box
              component={NavLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #1f2333, #141721)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(245, 158, 11, 0.2)',
                }}
              >
                <MenuBookIcon sx={{ color: '#fbbf24', fontSize: 22 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: '#f8fafc',
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    lineHeight: 1.1,
                  }}
                >
                  Phonebook
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#f59e0b',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Directory Ledger
                </Typography>
              </Box>
            </Box>

            {/* Navigation Menu */}
            <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
              <NavLink to="/" end className="nav-link">
                <HomeIcon fontSize="small" sx={{ opacity: 0.8 }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Home</Box>
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink to="/contacts" className="nav-link">
                    <ContactPhoneIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Directory</Box>
                  </NavLink>
                  <UserMenu />
                </>
              ) : (
                <>
                  <NavLink to="/contacts" className="nav-link">
                    <ContactPhoneIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Directory</Box>
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    <LoginIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Box component="span">Sign In</Box>
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    <PersonAddIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Box component="span">Sign Up</Box>
                  </NavLink>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Outlet Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Header;

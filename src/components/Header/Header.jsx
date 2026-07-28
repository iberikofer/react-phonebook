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
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          py: 1.5,
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
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)',
                }}
              >
                <MenuBookIcon sx={{ color: '#fff', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #f8fafc 30%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                }}
              >
                Phonebook
              </Typography>
            </Box>

            {/* Navigation Menu */}
            <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              <NavLink to="/" end className="nav-link">
                <HomeIcon fontSize="small" />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Home</Box>
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink to="/contacts" className="nav-link">
                    <ContactPhoneIcon fontSize="small" />
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Contacts</Box>
                  </NavLink>
                  <UserMenu />
                </>
              ) : (
                <>
                  <NavLink to="/contacts" className="nav-link">
                    <ContactPhoneIcon fontSize="small" />
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Contacts</Box>
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    <LoginIcon fontSize="small" />
                    <Box component="span">Sign IN</Box>
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    <PersonAddIcon fontSize="small" />
                    <Box component="span">Sign UP</Box>
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

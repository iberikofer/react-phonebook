import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Paper
        className="phonebook-card"
        sx={{
          p: 5,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <MenuBookIcon sx={{ fontSize: 56, color: '#f59e0b', opacity: 0.8 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          Page Not In Directory
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          You will be automatically redirected to the directory ledger in 5 seconds.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 700,
            backgroundColor: '#f59e0b',
            color: '#0c0d12',
            '&:hover': {
              backgroundColor: '#d97706',
            },
          }}
        >
          Return to Directory
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;

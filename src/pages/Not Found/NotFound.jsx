import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
        className="glass-card"
        sx={{
          p: 5,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: '#f87171' }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc' }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          You will be automatically redirected to the home page in 5 seconds.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          }}
        >
          Return to Home Now
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;

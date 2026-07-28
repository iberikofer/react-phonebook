import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/authentication/operations';
import { clearAuthError } from 'redux/authentication/authSlice';
import { useAuth } from 'hooks/index';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#f8fafc',
    borderRadius: '14px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: '#38bdf8' },
    '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #1e293b inset !important',
      WebkitTextFillColor: '#f8fafc !important',
    },
  },
  '& .MuiInputLabel-root': { color: '#94a3b8' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
};

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthError, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleLogIn = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };

  const handleRegisterInNavigate = () => {
    dispatch(clearAuthError());
    navigate('/register');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 3, sm: 6 }, mb: 6 }}>
      <Paper
        elevation={0}
        className="glass-card"
        sx={{
          p: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: '0 8px 20px rgba(56, 189, 248, 0.35)',
          }}
        >
          <LoginIcon sx={{ color: '#fff', fontSize: 30 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1, textAlign: 'center' }}>
          Welcome Back
        </Typography>

        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, textAlign: 'center' }}>
          Please sign in to access your phonebook
        </Typography>

        {isAuthError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearAuthError())}
            sx={{
              width: '100%',
              mb: 3,
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              '& .MuiAlert-icon': { color: '#f87171' },
            }}
          >
            Invalid email or password. Please check your credentials and try again.
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogIn} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            placeholder="example@mail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#38bdf8' }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />

          <TextField
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#38bdf8' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#94a3b8' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: '14px',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
              boxShadow: '0 8px 24px rgba(56, 189, 248, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0284c7, #4f46e5)',
                boxShadow: '0 10px 28px rgba(56, 189, 248, 0.55)',
              },
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Don't have an account?
          </Typography>
          <Button
            onClick={handleRegisterInNavigate}
            sx={{
              color: '#c084fc',
              fontWeight: 700,
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              '&:hover': { background: 'transparent', textDecoration: 'underline' },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;

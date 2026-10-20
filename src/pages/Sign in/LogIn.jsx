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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#f8fafc',
    borderRadius: '10px',
    backgroundColor: '#161925',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #161925 inset !important',
      WebkitTextFillColor: '#f8fafc !important',
    },
  },
  '& .MuiInputLabel-root': { color: '#94a3b8', fontSize: '0.9rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
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
        className="phonebook-card"
        sx={{
          p: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <VpnKeyOutlinedIcon sx={{ color: '#fbbf24', fontSize: 26 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.75, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Directory Access
        </Typography>

        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, textAlign: 'center', fontSize: '0.875rem' }}>
          Sign in to unlock and synchronize your contacts
        </Typography>

        {isAuthError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearAuthError())}
            sx={{
              width: '100%',
              mb: 2.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontSize: '0.825rem',
            }}
          >
            Invalid email or password. Please verify credentials.
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogIn} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.25 }}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            placeholder="e.g. adrian@mail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
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
                  <LockOutlinedIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: '#94a3b8' }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
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
              mt: 0.5,
              py: 1.35,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              backgroundColor: '#f59e0b',
              color: '#0c0d12',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
              '&:hover': {
                backgroundColor: '#d97706',
                boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)',
              },
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Directory'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            No personal account yet?
          </Typography>
          <Button
            onClick={handleRegisterInNavigate}
            sx={{
              color: '#fbbf24',
              fontWeight: 700,
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              fontSize: '0.85rem',
              '&:hover': { background: 'transparent', textDecoration: 'underline' },
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;

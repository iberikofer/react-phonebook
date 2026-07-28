import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'redux/authentication/operations';
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
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#f8fafc',
    borderRadius: '14px',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: '#a855f7' },
    '&.Mui-focused fieldset': { borderColor: '#a855f7' },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #1e293b inset !important',
      WebkitTextFillColor: '#f8fafc !important',
    },
  },
  '& .MuiInputLabel-root': { color: '#94a3b8' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#c084fc' },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthError, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleRegister = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  const handleLogInNavigate = () => {
    dispatch(clearAuthError());
    navigate('/login');
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
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
          }}
        >
          <PersonAddIcon sx={{ color: '#fff', fontSize: 30 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1, textAlign: 'center' }}>
          Create Account
        </Typography>

        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, textAlign: 'center' }}>
          Join Phonebook to manage all your contacts seamlessly
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
            Registration failed. Check if email is unique and password is at least 7 characters long.
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            required
            label="First & Last Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            variant="outlined"
            placeholder="John Doe"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#a855f7' }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />

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
                  <EmailIcon sx={{ color: '#a855f7' }} />
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
            helperText="Minimum 7 characters"
            FormHelperTextProps={{ sx: { color: '#94a3b8', fontSize: '0.75rem', ml: 1 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#a855f7' }} />
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
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5, #9333ea, #db2777)',
                boxShadow: '0 10px 28px rgba(168, 85, 247, 0.55)',
              },
            }}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Already have an account?
          </Typography>
          <Button
            onClick={handleLogInNavigate}
            sx={{
              color: '#38bdf8',
              fontWeight: 700,
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              '&:hover': { background: 'transparent', textDecoration: 'underline' },
            }}
          >
            Log in
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

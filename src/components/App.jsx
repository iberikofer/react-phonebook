import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/index';
import { refreshUser } from 'redux/authentication/operations';
import Header from './Header/Header';
import Content from './Content/Content';
import LogIn from 'pages/Sign in/LogIn';
import Register from 'pages/Sign up/Register';
import Home from 'pages/Home/Home';
import NotFound from 'pages/Not Found/NotFound';
import ProtectedRoute from 'routes/ProtectedRoute';
import Loader from './Loader/Loader';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.85)',
    },
    primary: {
      main: '#a855f7',
    },
    secondary: {
      main: '#38bdf8',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
        },
      },
    },
  },
});

export const App = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isRefreshing, isLoading } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isRefreshing || isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LogIn />} />
              <Route path="register" element={<Register />} />
              <Route
                path="contacts"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Content />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default App;

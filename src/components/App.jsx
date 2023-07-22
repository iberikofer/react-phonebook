import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/index';
import { refreshUser } from 'redux/authentication/operations';
import { fetchContacts } from 'redux/contacts/operations';
import Header from './Header/Header';
import Content from './Content/Content';
import LogIn from 'pages/Sign in/LogIn';
import Register from 'pages/Sign up/Register';
import Home from 'pages/Home/Home';
import NotFound from 'pages/Not Found/NotFound';
import ProtectedRoute from 'routes/ProtectedRoute';
import Loader from './Loader/Loader';

export const App = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isRefreshing, isLoading } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (isRefreshing || isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
      </div>
    );
  }
};

export default App;

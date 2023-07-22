import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/authentication/operations';
import { useAuth } from 'hooks/index';
import { TextField, Button } from '@mui/material';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hanldeLogIn = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };

  const handleRegisterInNavigate = () => {
    navigate('/register');
  };

  return (
    <div
      style={{
        maxWidth: '30%',
        margin: '50px auto',
        backgroundColor: '#fff',
        border: '5px ridge red',
        borderRadius: 25,
      }}
    >
      <form
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 20,
        }}
        onSubmit={hanldeLogIn}
      >
        <h2>Login please! </h2>
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ borderRadius: 15, padding: 5 }}
          required
          autoComplete="true"
          id="filled-basic"
          label="Email"
          variant="filled"
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ borderRadius: 15, padding: 5 }}
          required
          autoComplete="true"
          id="filled-basic"
          label="Password"
          variant="filled"
        />
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </form>
      <div
        style={{
          paddingBottom: 20,
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
        }}
      >
        <p>No account?</p>{' '}
        <Button
          onClick={handleRegisterInNavigate}
          variant="contained"
          color="success"
        >
          Sign up!
        </Button>
      </div>
      {isAuthError && (
        <p
          style={{
            color: 'red',
            textAlign: 'center',
            paddingBottom: 20,
          }}
        >
          Error occured, check the console or try again :c.
        </p>
      )}
    </div>
  );
};

export default LogIn;

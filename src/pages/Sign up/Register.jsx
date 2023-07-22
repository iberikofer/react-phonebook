import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'redux/authentication/operations';
import { useAuth } from 'hooks/index';
import { TextField, Button } from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hanldeRegister = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  const handleLogInNavigate = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        maxWidth: '45%',
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
        onSubmit={hanldeRegister}
      >
        <h2>Register to Phonebook</h2>
        <TextField
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ borderRadius: 15, padding: 5 }}
          required
          autoComplete="true"
          id="filled-basic"
          label="First and Last name"
          variant="filled"
        />
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ borderRadius: 15, padding: 5 }}
          required
          autoComplete="true"
          id="filled-basic"
          label="Real email"
          variant="filled"
        />
        <TextField
          type="password"
          name="password"
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
          Sign up
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
        <p>You have an account?</p>
        <Button
          onClick={handleLogInNavigate}
          variant="contained"
          color="success"
        >
          Log in!
        </Button>
      </div>
      {isAuthError && (
        <p style={{ color: 'red', textAlign: 'center', paddingBottom: 20 }}>
          Error occured, check the console or try again :c.
        </p>
      )}
    </div>
  );
};

export default Register;

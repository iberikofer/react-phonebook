import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/index';

const Home = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div
        style={{
          margin: '150px auto 0px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <h2>Hello user, this is Phonebook! </h2>
        <p>
          Here you can make your own phonebook by adding, deleting or filtering
          your contacts!
        </p>
        <p>
          To start, you need to {<Link to="login">log in</Link>} to your
          account, or {<Link to="/register">create one</Link>}.
        </p>
      </div>
    );
  } else {
    return (
      <div
        style={{
          margin: '150px auto 0px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <h2>
          Hello <span style={{ color: '#dc143c' }}>{user.name}</span>, this is
          your Phonebook!{' '}
        </h2>
        <p>Let's {<Link to="/contacts">add some contacts</Link>}!</p>
        {/* TODO: Add GIF here */}
      </div>
    );
  }
};

export default Home;

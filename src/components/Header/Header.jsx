import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/index';
import UserMenu from 'components/UserMenu/UserMenu';

const Header = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div style={{ width: '100%' }}>
        <h1
          style={{
            width: '100%',
            padding: '20px 0px',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          Redux Phonebook with personal account
        </h1>
        <header
          style={{
            padding: 10,
            position: 'sticky',
            top: -0.5,
            zIndex: 100,
            boxShadow:
              'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
          }}
        >
          <nav
            style={{ display: 'flex', gap: 20, justifyContent: 'space-around' }}
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/contacts">Contacts</NavLink>
            <NavLink to="/login">Sign IN</NavLink>
            <NavLink to="/register">Sign UP</NavLink>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    );
  } else {
    return (
      <div style={{ width: '100%' }}>
        <h1
          style={{
            width: '100%',
            padding: '20px 0px',
            position: 'relative',

            textAlign: 'center',
          }}
        >
          Redux Phonebook with personal account
        </h1>
        <header
          style={{
            padding: 10,
            position: 'sticky',
            top: -1,
            zIndex: 100,
            boxShadow:
              'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
          }}
        >
          <nav
            style={{ display: 'flex', gap: 20, justifyContent: 'space-around' }}
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/contacts">Contacts</NavLink>
            <UserMenu />
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
};

export default Header;

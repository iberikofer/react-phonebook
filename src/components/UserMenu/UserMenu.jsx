import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/index';
import { logOut } from 'redux/authentication/operations';
import { Avatar, Button } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Avatar src="/broken-image.jpg" /> {user.email}
      <Button onClick={handleLogOut} variant="outlined" color="error">
        Sign OUT
      </Button>
    </div>
  );
};
export default UserMenu;

import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/index';
import { logOut } from 'redux/authentication/operations';
import { Avatar, Button, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const getInitial = nameOrEmail => {
    if (!nameOrEmail) return 'U';
    return nameOrEmail.charAt(0).toUpperCase();
  };

  const displayName = user?.name || user?.email || 'User';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        ml: { xs: 0.5, sm: 1.5 },
        p: '4px 10px 4px 6px',
        borderRadius: '30px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Avatar
        sx={{
          width: 34,
          height: 34,
          fontSize: '0.9rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)',
        }}
      >
        {getInitial(displayName)}
      </Avatar>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: '#f8fafc',
          display: { xs: 'none', md: 'block' },
          maxWidth: '150px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {displayName}
      </Typography>

      <Button
        onClick={handleLogOut}
        variant="contained"
        size="small"
        startIcon={<LogoutIcon sx={{ fontSize: '1.1rem !important' }} />}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.825rem',
          px: 2,
          py: 0.5,
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            boxShadow: '0 6px 16px rgba(220, 38, 38, 0.45)',
          },
        }}
      >
        Sign OUT
      </Button>
    </Box>
  );
};

export default UserMenu;

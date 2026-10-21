import { useAppDispatch } from 'redux/hooks';
import { useAuth } from 'hooks/index';
import { logOut } from 'redux/authentication/operations';
import { Avatar, Button, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const getInitial = (nameOrEmail: string | null) => {
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
        borderRadius: '24px',
        background: '#191c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: '0.85rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #f59e0b, #b45309)',
          color: '#0c0d12',
          border: '1px solid rgba(255, 255, 255, 0.2)',
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
          fontSize: '0.875rem',
        }}
      >
        {displayName}
      </Typography>

      <Button
        onClick={handleLogOut}
        variant="outlined"
        size="small"
        startIcon={<LogoutIcon sx={{ fontSize: '1rem !important' }} />}
        sx={{
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.8rem',
          px: 1.5,
          py: 0.4,
          color: '#f87171',
          borderColor: 'rgba(248, 113, 113, 0.25)',
          backgroundColor: 'rgba(239, 68, 68, 0.06)',
          '&:hover': {
            borderColor: 'rgba(248, 113, 113, 0.5)',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
          },
        }}
      >
        Log out
      </Button>
    </Box>
  );
};

export default UserMenu;

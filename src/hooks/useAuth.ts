import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsError,
  selectIsRefreshing,
  selectIsLoading,
} from 'redux/authentication/selectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthError = useSelector(selectIsError);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  return {
    user,
    isLoggedIn,
    isAuthError,
    isRefreshing,
    isLoading,
  };
};

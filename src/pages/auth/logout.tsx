import { useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider';

import withAuth from '../../components/auth/withAuth';
import LinearProgress from '@material-ui/core/LinearProgress';

function Logout() {
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    localStorage.clear();
    setAuthenticated(false);
  }, [setAuthenticated]);

  return <LinearProgress />;
}

export default withAuth(Logout, '/');

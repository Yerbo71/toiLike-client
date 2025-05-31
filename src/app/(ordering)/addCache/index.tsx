import React, { useContext } from 'react';
import AddCachePage from '@/src/pages/addCache';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared';

export default function AddCache() {
  const { isAuthenticated } = useContext(AuthContext);

  return <>{isAuthenticated ? <AddCachePage /> : <WithoutToken />}</>;
}

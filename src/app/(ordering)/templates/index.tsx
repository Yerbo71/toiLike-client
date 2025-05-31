import React, { useContext } from 'react';
import { WithoutToken } from '@/src/shared/withoutToken';
import { AuthContext } from '@/src/context/AuthContext';
import TemplatesPage from '@/src/pages/templates';

export default function Templates() {
  const { isAuthenticated } = useContext(AuthContext);
  return <>{isAuthenticated ? <TemplatesPage /> : <WithoutToken />}</>;
}

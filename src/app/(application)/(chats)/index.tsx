import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';
import ChatsPage from '@/src/pages/chats';

export default function Index() {
  const { isAuthenticated } = useContext(AuthContext);
  return <>{isAuthenticated ? <ChatsPage /> : <WithoutToken />}</>;
}

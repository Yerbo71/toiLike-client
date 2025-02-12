import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/components/withoutToken';

export default function Chats() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Chats</Text>
          <Button mode="contained">Press</Button>
        </View>
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';

export default function MyApplications() {
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
          <Text>My Applications</Text>
          <Button mode="contained">Press</Button>
        </View>
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

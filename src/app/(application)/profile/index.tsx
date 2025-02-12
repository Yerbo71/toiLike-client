import { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import { WithoutToken } from '@/src/components/withoutToken';

export default function Profile() {
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
          <Text>Profile</Text>
          <Button mode="contained">Press</Button>
        </View>
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

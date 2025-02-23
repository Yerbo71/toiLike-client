import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';
import { router } from 'expo-router';

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
          <Button
            mode="contained"
            onPress={() => {
              router.push('/(auth)/login');
            }}
            style={{
              width: 300,
              marginTop: 10,
            }}
          >
            Login
          </Button>
        </View>
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

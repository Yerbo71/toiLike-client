import { View, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import React, { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';

export default function MyApplications() {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const theme = useTheme();
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
          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={{
              borderColor: theme.colors.error,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
            }}
            onPress={() => signOut()}
          >
            Sign out
          </Button>
        </View>
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

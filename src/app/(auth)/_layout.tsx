import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
      }}
    >
      <Stack.Screen name="login/index" options={{ headerTitle: '' }} />
      <Stack.Screen name="registration/index" options={{ headerTitle: '' }} />
      <Stack.Screen
        name="reset-password-email/index"
        options={{ headerTitle: '' }}
      />
    </Stack>
  );
};

export default AuthLayout;

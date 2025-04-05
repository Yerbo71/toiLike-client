import React from 'react';
import { Stack } from 'expo-router';

const ChatsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
      }}
    >
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
};

export default ChatsLayout;

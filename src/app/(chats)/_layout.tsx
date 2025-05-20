import React from 'react';
import { Stack } from 'expo-router';

const ChatsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat/[id]/index" />
      <Stack.Screen name="chat/gemini/[eventId]" />
    </Stack>
  );
};

export default ChatsLayout;

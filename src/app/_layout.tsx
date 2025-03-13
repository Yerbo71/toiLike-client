import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from '@/src/context/AuthContext';
import { ThemeProviderApp, useTheme } from '@/src/context/ThemeContext';

function RootLayoutContent() {
  const { theme, paperTheme } = useTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AuthProvider>
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={theme === 'dark' ? '#2b2732' : '#f3edf6'}
          />
          <Stack>
            <Stack.Screen
              name="(application)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderApp>
      <RootLayoutContent />
    </ThemeProviderApp>
  );
}

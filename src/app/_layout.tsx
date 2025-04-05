import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from '@/src/context/AuthContext';
import { ThemeProviderApp, useTheme } from '@/src/context/ThemeContext';
import { I18nProvider } from '@/src/context/LocaleContext';
import Toast from 'react-native-toast-message';

function RootLayoutContent() {
  const { theme, paperTheme } = useTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AuthProvider>
          <StatusBar
            barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'}
            backgroundColor={theme === 'Dark' ? '#2b2732' : '#f3edf6'}
          />
          <Stack>
            <Stack.Screen
              name="(application)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(ordering)" options={{ headerShown: false }} />
            <Stack.Screen name="(chats)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <I18nProvider>
      <ThemeProviderApp>
        <RootLayoutContent />
      </ThemeProviderApp>
    </I18nProvider>
  );
}

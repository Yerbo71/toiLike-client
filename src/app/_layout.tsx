import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar, Platform } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthProvider } from '@/src/context/AuthContext';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '@/src/core/theme/createTheming';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const isDarkTheme = colorScheme === 'dark';

      NavigationBar.setBackgroundColorAsync(
        isDarkTheme ? '#2b2732' : '#f3edf6',
      );
    }
  }, [colorScheme]);

  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AuthProvider>
          <StatusBar
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={colorScheme === 'dark' ? '#2b2732' : '#f3edf6'}
          />
          <Stack>
            <Stack.Screen
              name="(application)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

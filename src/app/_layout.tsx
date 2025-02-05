import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar, Platform } from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useEffect } from 'react';

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: Colors.dark,
};

const customLightTheme = {
  ...MD3LightTheme,
  colors: Colors.light,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

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
      </ThemeProvider>
    </PaperProvider>
  );
}

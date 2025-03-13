import React from 'react';
import { Surface } from 'react-native-paper';
import { ChevronButton } from '@/src/shared/chevronButton';
import { useTheme } from '@/src/context/ThemeContext';

const ProfileTechSupport = () => {
  const { setThemeMode, themeMode } = useTheme();

  const toggleThemeMode = () => {
    const nextMode =
      themeMode === 'System'
        ? 'Light'
        : themeMode === 'Light'
          ? 'Dark'
          : 'System';

    setThemeMode(nextMode);
  };

  return (
    <Surface
      style={{
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <ChevronButton
        leftIcon="account-wrench"
        leftTitle="Tech support"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
      <ChevronButton
        leftIcon="application-braces"
        leftTitle="About application"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
      <ChevronButton
        leftIcon="progress-star"
        leftTitle="Rate app"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
      <ChevronButton
        leftIcon="theme-light-dark"
        leftTitle="Theme"
        rightIcon="chevron-right"
        rightTitle={themeMode}
        onPress={toggleThemeMode}
      />
    </Surface>
  );
};

export default ProfileTechSupport;

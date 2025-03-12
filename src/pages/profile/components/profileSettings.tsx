import React from 'react';
import { Surface } from 'react-native-paper';
import { ChevronButton } from '@/src/shared/chevronButton';

const ProfileSettings = () => {
  return (
    <Surface
      style={{
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <ChevronButton
        leftIcon="city"
        leftTitle="City"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
      <ChevronButton
        leftIcon="alpha-a-circle-outline"
        leftTitle="Language"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
      <ChevronButton
        leftIcon="bell"
        leftTitle="Notifications"
        rightIcon="chevron-right"
        rightTitle="Choose"
      />
    </Surface>
  );
};

export default ProfileSettings;

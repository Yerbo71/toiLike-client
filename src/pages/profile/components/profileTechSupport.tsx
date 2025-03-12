import React from 'react';
import { Button, Surface } from 'react-native-paper';
import { ChevronButton } from '@/src/shared/chevronButton';

const ProfileTechSupport = () => {
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
    </Surface>
  );
};

export default ProfileTechSupport;

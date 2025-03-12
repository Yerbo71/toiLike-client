import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { AuthContext } from '@/src/context/AuthContext';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { CTextInput } from '@/src/shared';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function Registration({ navigation }: any) {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    delete data.confirmPassword;
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', gap: 40 }}>
      <View style={{ gap: 10 }}>
        <Text
          variant="headlineMedium"
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: theme.colors.primary,
          }}
        >
          Registration here
        </Text>
        <Text variant="titleMedium" style={{ alignSelf: 'center' }}>
          Please enter your username and email
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <CTextInput
          control={control}
          name="username"
          label="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 4,
              message: 'Username must be at least 4 characters',
            },
          }}
        />
        <CTextInput
          control={control}
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter a valid email',
            },
          }}
        />
        <CTextInput
          control={control}
          name="password"
          label="Password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />
        <CTextInput
          control={control}
          name="confirmPassword"
          label="Confirm password"
          rules={{
            required: 'Confirm Password is required',
            validate: (value: string | undefined) =>
              value === watch('password') || 'Passwords do not match',
          }}
        />
      </View>
      <Button
        mode="contained"
        style={{ borderRadius: 10 }}
        onPress={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
      <Text
        variant="bodyMedium"
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
        onPress={() => router.push('/(auth)/login')}
      >
        Already have an account?
      </Text>
    </View>
  );
}

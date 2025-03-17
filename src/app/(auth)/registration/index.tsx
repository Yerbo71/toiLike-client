import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { CTextInput } from '@/src/shared';
import { signUp } from '@/src/core/rest/sign-up';
import Toast from 'react-native-toast-message';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function Registration() {
  const theme = useTheme();
  const [isPending, setIsPending] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const { confirmPassword, ...requestData } = data;
      await signUp(requestData);
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'You can now log in!',
      });
      reset();
      router.push('/(auth)/login');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: (err as Error).message,
      });
    } finally {
      setIsPending(false);
    }
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
          secureTextEntry
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
          secureTextEntry
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
        loading={isPending}
        disabled={isPending}
      >
        {isPending ? 'Signing Up...' : 'Sign Up'}
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

import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { AuthContext } from '@/src/context/AuthContext';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { CTextInput } from '@/src/shared';
import { login } from '@/src/core/rest/login-in';
import Toast from 'react-native-toast-message';
import type { components } from '@/src/types/api';

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const theme = useTheme();
  const { control, handleSubmit } = useForm<
    components['schemas']['LoginInRequest']
  >({
    mode: 'onSubmit',
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: components['schemas']['LoginInRequest']) => {
    setIsPending(true);
    try {
      const response = await login(data);
      await signIn(response.accessToken);
      router.replace('/(application)');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: (err as Error).message,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text
          variant="headlineMedium"
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: theme.colors.primary,
          }}
        >
          Login here
        </Text>
        <Text variant="titleMedium" style={{ alignSelf: 'center' }}>
          Please enter your username and password
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <CTextInput
          control={control}
          name="usernameOrEmail"
          label="Username or email"
          rules={{
            required: 'Username or email is required',
            minLength: {
              value: 4,
              message: 'Username or email must be at least 4 characters',
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
          secureTextEntry
        />
        <Text
          variant="bodyMedium"
          style={{
            alignSelf: 'flex-end',
            fontWeight: 'bold',
            color: theme.colors.primary,
          }}
        >
          Forgot your password?
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        disabled={isPending}
      >
        Sign In
      </Button>
      <Text
        variant="bodyMedium"
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
        onPress={() => {
          router.push('/(auth)/registration');
        }}
      >
        Create new account
      </Text>
    </View>
  );
}

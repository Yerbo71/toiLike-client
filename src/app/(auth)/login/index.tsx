import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { CTextInput } from '@/src/shared';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = await signIn?.(data.username, data.password);
    // if (!result?.success) {
    //   // Можно добавить обработку ошибок логина, например, setError('root', { message: result?.message })
    // } else {
    //   router.replace('/protected');
    // }
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
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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

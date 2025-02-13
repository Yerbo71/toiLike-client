import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

export default function Login({ navigation }: any) {
  const { signIn } = useContext(AuthContext);
  const theme = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = await signIn?.(data.username, data.password);
    if (!result?.success) {
      // Можно добавить обработку ошибок логина, например, setError('root', { message: result?.message })
    } else {
      navigation.replace('Protected');
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
        <View>
          <TextInput
            label="Username"
            mode="outlined"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
            error={!!errors.username}
          />
          {errors.username && (
            <Text
              style={{ color: theme.colors.error, marginTop: 5 }}
              variant="labelSmall"
            >
              {errors.username.message}
            </Text>
          )}
        </View>
        <View>
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
          />
          {errors.password && (
            <Text
              style={{ color: theme.colors.error, marginTop: 5 }}
              variant="labelSmall"
            >
              {errors.password.message}
            </Text>
          )}
        </View>
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
        style={{ borderRadius: 10 }}
        onPress={handleSubmit(onSubmit)}
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
      >
        Create new account
      </Text>
    </View>
  );
}

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

export default function Login({ navigation }: any) {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const result = await signIn?.(username, password);
    if (!result?.success) {
      // setError(result?.message);
    } else {
      navigation.replace('Protected');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

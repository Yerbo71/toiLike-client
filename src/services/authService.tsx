import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

// Фейковый вход (сохранение токена)
export const login = async (username: string, password: string) => {
  // В реальности тут был бы запрос к API
  if (username === 'test' && password === '1234') {
    const fakeToken = 'fake-jwt-token';
    await AsyncStorage.setItem(TOKEN_KEY, fakeToken);
    return { success: true, token: fakeToken };
  }
  return { success: false, message: 'Invalid credentials' };
};

// Фейковая проверка токена (как middleware)
export const checkAuth = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token ? { isAuthenticated: true, token } : { isAuthenticated: false };
};

// Выход (удаление токена)
export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home</Text>
      <Button mode="contained">Press</Button>
    </View>
  );
}

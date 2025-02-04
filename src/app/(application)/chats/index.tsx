import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function Chats() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Chats</Text>
      <Button mode="contained">Press</Button>
    </View>
  );
}

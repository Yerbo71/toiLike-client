import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile</Text>
      <Button mode="contained">Press</Button>
    </View>
  );
}

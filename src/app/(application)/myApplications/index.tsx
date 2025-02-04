import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function MyApplications() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>My Applications</Text>
      <Button mode="contained">Press</Button>
    </View>
  );
}

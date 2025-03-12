import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

export const DetailAvatar = () => {
  return (
    <View style={{ position: 'absolute', top: -55, alignSelf: 'center' }}>
      <Avatar.Icon
        icon="folder"
        size={100}
        style={{
          borderStyle: 'solid',
          borderWidth: 5,
          borderColor: 'rgb(0, 95, 175)',
        }}
      />
    </View>
  );
};

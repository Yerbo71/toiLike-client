import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

const DetailAvatar = () => {
  return (
    <View style={{ position: 'absolute', top: -55, alignSelf: 'center' }}>
      <Avatar.Icon
        icon="folder"
        size={100}
        style={{ borderStyle: 'solid', borderWidth: 5 }}
      />
    </View>
  );
};

export default DetailAvatar;

import { Image, View } from 'react-native';
import DetailProfile from '@/src/pages/details/detailProfile';
import React from 'react';

export default function Details() {
  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/701' }}
        style={{ width: '100%', height: 300 }}
        resizeMode="cover"
      />
      <DetailProfile />
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, useTheme } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const DetailProfileRateBlock = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <AntDesign name="star" size={15} color={theme.colors.onSurface} />
        <Text variant="bodyMedium">4.5</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <FontAwesome name="comment" size={15} color={theme.colors.onSurface} />
        <Text variant="bodyMedium">12</Text>
      </View>
    </View>
  );
};

export default DetailProfileRateBlock;

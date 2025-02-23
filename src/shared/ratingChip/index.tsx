import React, { FC } from 'react';
import { useTheme, Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from 'react-native';

interface Props {
  rating: number;
}

export const RatingChip: FC<Props> = ({ rating }) => {
  const theme = useTheme();

  const colorChange = () => {
    if (rating >= 4.5) {
      return '#4CAF50';
    } else if (rating >= 3.5) {
      return '#FFC107';
    } else {
      return '#F44336';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colorChange(),
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <AntDesign name="star" size={15} color={theme.colors.onSurface} />
      <Text variant="bodyMedium">{rating}</Text>
    </View>
  );
};

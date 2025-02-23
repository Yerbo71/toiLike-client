import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const DetailProfileAddInfoBlock = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text variant="bodySmall">
        blasdaa efafesf eafaefea faefaefae feafaefaef eafaef
      </Text>
    </View>
  );
};

export default DetailProfileAddInfoBlock;

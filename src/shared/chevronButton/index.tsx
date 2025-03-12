import React, { FC } from 'react';
import { Icon, Text } from 'react-native-paper';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface Props {
  leftIcon: string;
  leftTitle: string;
  rightIcon: string;
  rightTitle: string;
  onPress?: () => void;
}

export const ChevronButton: FC<Props> = ({
  leftIcon,
  leftTitle,
  rightIcon,
  rightTitle,
  onPress,
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colorScheme === 'dark' ? '#838383' : '#777777',
        borderRadius: 12,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.side}>
        <Icon size={20} source={leftIcon} />
        <Text variant="bodyMedium">{leftTitle}</Text>
      </View>
      <View style={styles.side}>
        <Text variant="bodyMedium">{rightTitle}</Text>
        <Icon size={20} source={rightIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

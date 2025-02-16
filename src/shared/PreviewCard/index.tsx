import React, { FC } from 'react';
import { View, Image, GestureResponderEvent } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';

interface Props {
  image: string;
  title: string;
  description: string;
  onPress: (event: GestureResponderEvent) => void;
}

const PreviewCard: FC<Props> = ({ image, title, description, onPress }) => {
  const theme = useTheme();

  return (
    <Card onPress={onPress} style={{ marginRight: 10, width: 200 }}>
      <Card.Cover source={{ uri: image }} />
      <Card.Content
        style={{
          marginTop: 10,
        }}
      >
        <Text variant="titleMedium">{title}</Text>
        <Text
          variant="bodyMedium"
          style={{ marginTop: 5, color: theme.colors.onSurfaceVariant }}
        >
          {description}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default PreviewCard;

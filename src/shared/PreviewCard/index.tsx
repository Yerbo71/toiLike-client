import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Card, Text, useTheme, Chip } from 'react-native-paper';
import RatingChip from '@/src/shared/ratingChip';

interface Props {
  image: string;
  title: string;
  description: string;
  rating: number;
  location: string;
  onPress: (event: GestureResponderEvent) => void;
}

const PreviewCard: FC<Props> = ({
  image,
  title,
  description,
  onPress,
  rating,
  location,
}) => {
  const theme = useTheme();

  return (
    <Card onPress={onPress} style={{ marginRight: 10, width: 200 }}>
      <Card.Cover source={{ uri: image }} />
      <RatingChip rating={rating} />
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
        <Text
          variant="bodyMedium"
          style={{ marginTop: 5, color: theme.colors.onSurfaceVariant }}
        >
          {location}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default PreviewCard;

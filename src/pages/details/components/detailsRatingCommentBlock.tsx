import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import { useI18n } from '@/src/context/LocaleContext';
import { Rating as RatingComponent } from 'react-native-ratings';

interface RatingInputProps {
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

const DetailsRatingCommentBlock: React.FC<RatingInputProps> = ({
  onSubmit,
  isLoading,
}) => {
  const theme = useTheme();
  const { t } = useI18n();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
      setIsExpanded(false);
    }
    console.log('Rating:', rating, 'Comment:', comment);
  };

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {!isExpanded ? (
        <Button
          mode="outlined"
          onPress={() => setIsExpanded(true)}
          style={styles.toggleButton}
        >
          {t('system.addReview')}
        </Button>
      ) : (
        <>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            {t('system.rating')}
          </Text>
          <RatingComponent
            showRating
            onFinishRating={setRating}
            startingValue={rating}
            style={styles.rating}
            ratingCount={5}
            imageSize={40}
          />
          <TextInput
            label={t('system.comment')}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            theme={{
              roundness: 12,
            }}
            style={[
              styles.input,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
            mode="outlined"
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => setIsExpanded(false)}
              style={styles.button}
            >
              {t('system.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={rating === 0 || isLoading}
              style={styles.button}
            >
              {t('system.submit')}
            </Button>
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  toggleButton: {
    alignSelf: 'center',
  },
  title: {
    marginBottom: 8,
    fontWeight: '500',
  },
  rating: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  input: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});

export default DetailsRatingCommentBlock;

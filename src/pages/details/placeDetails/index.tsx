import React, { useCallback, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Avatar, Button, Text, useTheme } from 'react-native-paper';
import DetailsDescriptionBlock from '@/src/pages/details/components/detailsDescriptionBlock';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useI18n } from '@/src/context/LocaleContext';
import {
  DetailRateBlock,
  EmptyView,
  ErrorView,
  LoadingView,
} from '@/src/shared';
import DetailsCommentBlock from '@/src/pages/details/components/detailsCommentBlock';
import { getPlace, getRatingPlace, postPlaceRate } from '@/src/core/rest/place';
import { useEvent } from '@/src/context/EventContext';
import { getChatByUser } from '@/src/core/rest/chat';
import DetailsRatingCommentBlock from '@/src/pages/details/components/detailsRatingCommentBlock';
import { postRateUserVendor } from '@/src/core/rest/userVendor';

const { width } = Dimensions.get('window');

const PlaceDetailsPage = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useI18n();
  const { event, setEvent } = useEvent();
  const queryClient = useQueryClient();
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const {
    data: vendor,
    isLoading: vendorIsLoading,
    error: vendorError,
    isRefetching,
  } = useQuery({
    queryKey: ['placeDetails', id],
    queryFn: () => getPlace(Number(id)),
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: rating,
    isLoading: ratingIsLoading,
    error: ratingError,
  } = useQuery({
    queryKey: ['ratingPlaceDetails', id],
    queryFn: () => getRatingPlace(Number(id)),
    staleTime: 5 * 60 * 1000,
  });

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['placeDetails', 'ratingPlaceDetails'],
    });
  }, [id, queryClient]);

  if (vendorIsLoading || ratingIsLoading || isRefetching) {
    return <LoadingView />;
  }

  if (vendorError || ratingError) {
    return <ErrorView />;
  }

  if (!vendor || !rating) {
    return <EmptyView />;
  }

  const handleSelectPlace = (placeId: number) => {
    setEvent({
      ...event,
      placeId: placeId,
    });
    //@ts-ignore
    router.push('/manualOrdering');
  };

  const handleMessagePlace = async (userId: number) => {
    try {
      const chat = await getChatByUser(userId);
      if (chat) {
        router.push({
          //@ts-ignore
          pathname: `/chat/${chat}`,
          params: { userId: String(userId) },
        });
      }
    } catch (error) {
      console.error('Failed to create or fetch chat:', error);
    }
  };

  const handleSubmitRating = async (ratingValue: number, comment: string) => {
    try {
      setIsSubmittingRating(true);
      await postPlaceRate({
        id: Number(id),
        rating: ratingValue,
        comment: comment,
      });
      queryClient.invalidateQueries({
        queryKey: ['ratingPlaceDetails'],
      });
    } catch (error) {
      console.error('Rating submission error:', error);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          progressBackgroundColor={theme.colors.surface}
          tintColor={theme.colors.primary}
        />
      }
    >
      <Image
        source={{ uri: vendor?.secondaryImage || 'https://picsum.photos/701' }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.avatarContainer}>
          <View
            style={[styles.avatarBorder, { borderColor: theme.colors.primary }]}
          >
            <Avatar.Image
              source={{ uri: vendor?.mainImage || 'https://picsum.photos/100' }}
              size={100}
              style={styles.avatarImage}
            />
          </View>
        </View>

        <Text
          variant="titleLarge"
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          {vendor?.title || 'No title'}
        </Text>

        <DetailRateBlock
          rating={vendor.rating || 0}
          commentCount={rating?.totalCount || 0}
        />

        <Button
          mode="contained"
          icon="plus"
          style={[
            styles.messageButton,
            { backgroundColor: theme.colors.primary },
          ]}
          labelStyle={styles.buttonLabel}
          onPress={() => handleSelectPlace(Number(id))}
        >
          {t('system.add')}
        </Button>

        <Button
          mode="outlined"
          icon="message"
          style={[styles.messageButton]}
          labelStyle={styles.buttonLabel}
          onPress={() => handleMessagePlace(vendor?.userId || 0)}
        >
          {t('system.message')}
        </Button>

        <DetailsDescriptionBlock description={vendor?.description} />

        <DetailsCommentBlock
          commentCount={rating.totalCount || 0}
          ratings={rating.list || []}
        />
        <DetailsRatingCommentBlock
          onSubmit={handleSubmitRating}
          isLoading={isSubmittingRating}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
    minHeight: width * 0.7,
  },
  avatarContainer: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  avatarBorder: {
    borderRadius: 60,
    padding: 4,
    backgroundColor: 'white',
    borderWidth: 3,
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 2,
    marginRight: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  messageButton: {
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
  },
  socialContainer: {
    marginTop: 6,
    marginBottom: 12,
  },
  servicesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  servicesScrollContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  serviceBlock: {
    width: width * 0.7,
    marginRight: 12,
  },
});

export default PlaceDetailsPage;

// HomeEventBlock.tsx
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';
import { PreviewCard } from '@/src/shared/previewCard';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getPopularEventTemplates } from '../../../core/rest/templates/get-popular-event-templates';
import { useI18n } from '@/src/context/LocaleContext';

const HomeEventBlock = () => {
  const theme = useTheme();
  const { t } = useI18n();
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popularEventTemplates'],
    queryFn: getPopularEventTemplates,
    // staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: theme.colors.error }}>Failed to load events</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant="titleLarge">{t('homePage.popularEvents')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {t('system.all')}
          </Text>
          <Entypo name="chevron-right" size={18} color={theme.colors.primary} />
        </View>
      </View>
      <FlatList
        data={events?.eventTemplates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15, gap: 10 }}
        renderItem={({ item }) => (
          <PreviewCard
            image={{ uri: item.mainImage }}
            title={item.title}
            description={item.description || ''}
            rating={item.rating}
            onPress={() => {
              router.push({
                pathname: '/(application)/details/[id]',
                params: {
                  id: item.id,
                },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default HomeEventBlock;

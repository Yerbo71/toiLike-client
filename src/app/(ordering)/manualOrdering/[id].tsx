import React, { useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';
import { getEvent } from '@/src/core/rest/event/get-event';
import ManualOrderingPage from '@/src/pages/manualOrdering';
import { ActivityIndicator, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export default function ManualOrdering() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const params = useLocalSearchParams();
  const eventId = Number(params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId, token!),
    enabled: isAuthenticated && !!eventId,
    staleTime: 5 * 60 * 1000,
  });

  if (!isAuthenticated) {
    return <WithoutToken />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading event data</Text>
      </View>
    );
  }
  console.log('everything', data);
  return <ManualOrderingPage eventData={data} />;
}

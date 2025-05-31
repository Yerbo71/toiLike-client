import React, { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { WithoutToken } from '@/src/shared/withoutToken';
import SubscriptionsPage from '@/src/pages/subscriptions';
import { useI18n } from '@/src/context/LocaleContext';
import { useQuery } from '@tanstack/react-query';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getUserSubscriptions } from '@/src/core/rest/user';

export default function Subscriptions() {
  const { t } = useI18n();
  const { isAuthenticated } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-vendor-id'],
    queryFn: () => getUserSubscriptions(),
    staleTime: 1000 * 60 * 60,
  });

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
        <Text>{t('system.error')}</Text>
      </View>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <SubscriptionsPage subscriptionData={data ?? []} />
      ) : (
        <WithoutToken />
      )}
    </>
  );
}

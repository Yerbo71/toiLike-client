import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useI18n } from '@/src/context/LocaleContext';

const StaffOrderingPage = () => {
  const { t } = useI18n();
  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <Image
        source={require('@/assets/eventImages/Event_1.jpg')}
        style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 15 }}
        resizeMode="cover"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginTop: 40,
        }}
      >
        <Text variant="headlineMedium">{t('staffOrderingPage.title')}</Text>
        <Text variant="bodyLarge">{t('staffOrderingPage.description')}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 30,
        }}
      >
        <Text variant="headlineSmall">
          {t('staffOrderingPage.orderItems1')}
        </Text>
        <Text variant="headlineSmall">
          {t('staffOrderingPage.orderItems2')}
        </Text>
        <Text variant="headlineSmall">
          {t('staffOrderingPage.orderItems3')}
        </Text>
        <Text variant="headlineSmall">
          {t('staffOrderingPage.orderItems4')}
        </Text>
      </View>
      <Button mode="contained" style={{ marginTop: 30 }}>
        {t('staffOrderingPage.orderNow')}
      </Button>
    </View>
  );
};

export default StaffOrderingPage;

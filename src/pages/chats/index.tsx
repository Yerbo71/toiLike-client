import React, { useCallback, useContext, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { Avatar, List, Text, useTheme } from 'react-native-paper';
import { chats } from '@/src/constants/mock/chats';
import { router } from 'expo-router';
import { useI18n } from '@/src/context/LocaleContext';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '@/src/core/rest/chat';
import { ErrorView, LoadingView } from '@/src/shared';
import { AuthContext } from '@/src/context/AuthContext';

const ChatsPage = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const [manualRefreshing, setManualRefreshing] = useState(false);
  const { token } = useContext(AuthContext);

  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: ['chats'],
    queryFn: getAllChats,
  });

  const onRefresh = useCallback(async () => {
    setManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setManualRefreshing(false);
    }
  }, [refetch]);

  if (isLoading && !manualRefreshing) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      <View style={{ margin: 15 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
          {t('system.chats')}
        </Text>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.lastMessage}
              left={() => <Avatar.Image size={40} source={item.image} />}
              right={() => <Text>{item.time}</Text>}
              onPress={() => {
                router.push({
                  // @ts-ignore
                  pathname:
                    item.model === 'gemini'
                      ? '/chat/gemini/[id]'
                      : '/chat/[id]',
                });
              }}
            />
          )}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.user.username}
              description={item.lastMessage}
              left={() =>
                item.user.avatar ? (
                  <Avatar.Image size={40} source={{ uri: item.user.avatar }} />
                ) : (
                  <Avatar.Text
                    size={40}
                    label={item.user.username.charAt(0).toUpperCase()}
                  />
                )
              }
              onPress={() =>
                router.push(
                  // @ts-ignore/
                  `/chat/${item.id}`,
                )
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ChatsPage;

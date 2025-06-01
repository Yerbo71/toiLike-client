import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import { chats } from '@/src/constants/mock/chats';
import { router } from 'expo-router';
import { useI18n } from '@/src/context/LocaleContext';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '@/src/core/rest/chat';
import { ErrorView, LoadingView } from '@/src/shared';

const ChatsPage = () => {
  const { t } = useI18n();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['chats'],
    queryFn: getAllChats,
  });

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
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
                  item.model === 'gemini' ? '/chat/gemini/[id]' : '/chat/[id]',
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
  );
};

export default ChatsPage;

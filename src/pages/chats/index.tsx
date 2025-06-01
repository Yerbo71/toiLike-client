import React, { useCallback, useContext, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Avatar, List, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useI18n } from '@/src/context/LocaleContext';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '@/src/core/rest/chat';
import { ErrorView, LoadingView } from '@/src/shared';
import { AuthContext } from '@/src/context/AuthContext';
import { chats } from '@/src/constants/mock/chats';

// Define types for your chats
type RealChat = {
  id: number;
  lastMessage?: string;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
};

type MockChat = {
  id: string;
  image: any; // Using 'any' for image since it's a require/import
  title: string;
  lastMessage: string;
  time: string;
  model: string;
};

type CombinedChat =
  | RealChat
  | {
      id: string;
      user: {
        username: string;
        avatar: any;
      };
      lastMessage: string;
      isMock: true;
      model: string;
    };

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

  // Type guard to check if a chat is a mock chat
  const isMockChat = (
    chat: CombinedChat,
  ): chat is {
    id: string;
    user: { username: string; avatar: any };
    lastMessage: string;
    isMock: true;
    model: string;
  } => {
    return 'isMock' in chat && chat.isMock === true;
  };

  // Combine mock and real data with proper typing
  const combinedChats: CombinedChat[] = [
    ...(data || []),
    ...chats.map((chat) => ({
      id: `mock_${chat.id}`,
      user: {
        username: chat.title,
        avatar: chat.image,
      },
      lastMessage: chat.lastMessage,
      isMock: true as const,
      model: chat.model,
    })),
  ];

  if (isLoading && !manualRefreshing) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView />;
  }

  const handleChatPress = (item: CombinedChat) => {
    if (isMockChat(item)) {
      router.push({
        //@ts-ignore
        pathname: item.model === 'gemini' ? '/chat/gemini/[id]' : '/chat/[id]',
        params: { id: item.id.replace('mock_', '') },
      });
    } else {
      router.push(`/chat/${item.id}`);
    }
  };

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
        {t('system.chats')}
      </Text>
      <FlatList
        data={combinedChats}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching || manualRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <List.Item
            title={isMockChat(item) ? item.user.username : item.user.username}
            description={item.lastMessage}
            left={() =>
              isMockChat(item) ? (
                <Avatar.Image size={40} source={item.user.avatar} />
              ) : item.user.avatar ? (
                <Avatar.Image size={40} source={{ uri: item.user.avatar }} />
              ) : (
                <Avatar.Text
                  size={40}
                  label={item.user.username.charAt(0).toUpperCase()}
                />
              )
            }
            onPress={() => handleChatPress(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {t('system.noChats')}
          </Text>
        }
      />
    </View>
  );
};

export default ChatsPage;

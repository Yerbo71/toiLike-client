import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import { chats } from '@/src/constants/mock/chats';
import { router } from 'expo-router';

const ChatsPage = () => {
  return (
    <View style={{ margin: 15 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
        Chats
      </Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.lastMessage}
            left={() => <Avatar.Icon icon="robot-happy" />}
            right={() => <Text>{item.time}</Text>}
            onPress={() => {
              router.push(`/chat/${item.id}`);
            }}
          />
        )}
      />
    </View>
  );
};

export default ChatsPage;

import React, { useState, useRef, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Card,
  TextInput,
  Text,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '@/src/core/rest/chat';
import { AuthContext } from '@/src/context/AuthContext';
import { LoadingView } from '@/src/shared';

type Message = {
  id?: number;
  convId?: number;
  fromUser: number;
  toUser: number;
  time?: string;
  content: string;
};

type Role = 'user' | 'partner';

const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const convId = id ? parseInt(id) : 0;
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id || 0;

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['chatHistory', convId],
    queryFn: async () => {
      const data = await getChatHistory(convId, 0, 1000);
      return data.map((message) => ({
        ...message,
        fromUser: message.fromUser || 0,
        toUser: message.toUser || 0,
        content: message.content || '',
      }));
    },
    enabled: !!convId,
    select: (data) =>
      data.sort(
        (a, b) =>
          new Date(a.time || 0).getTime() - new Date(b.time || 0).getTime(),
      ),
  });

  const getMessageRole = (message: Message): Role => {
    return message.fromUser === currentUserId ? 'user' : 'partner';
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView
            style={styles.chatContainer}
            ref={scrollRef}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message, index) => {
              const role = getMessageRole(message);
              return (
                <Card
                  key={`${message.id || index}_${message.time}`}
                  mode="contained"
                  style={[
                    styles.messageCard,
                    role === 'user'
                      ? styles.userMessage
                      : styles.partnerMessage,
                    {
                      backgroundColor:
                        role === 'user'
                          ? theme.colors.primaryContainer
                          : theme.colors.surfaceVariant,
                    },
                  ]}
                >
                  <Card.Content>
                    <Text variant="bodyMedium">{message.content}</Text>
                    <View style={styles.messageFooter}>
                      <Text variant="labelSmall" style={styles.timestamp}>
                        {message.time
                          ? new Date(message.time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              mode="outlined"
              placeholder="Введите сообщение"
              value={input}
              onChangeText={setInput}
              style={styles.input}
              theme={{ roundness: 20 }}
              disabled={true}
            />
            <IconButton
              icon="send"
              mode="contained"
              size={24}
              disabled={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageCard: {
    maxWidth: '80%',
    marginVertical: 4,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  partnerMessage: {
    alignSelf: 'flex-start',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  sendButton: {
    margin: 0,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    opacity: 0.6,
    marginRight: 4,
  },
});

export default ChatPage;

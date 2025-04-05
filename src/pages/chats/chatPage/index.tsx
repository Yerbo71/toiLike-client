import React, { useState, useRef } from 'react';
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
import { askChatGPT } from '@/src/core/api/chatgpt';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Привет! Чем могу помочь?' },
  ]);
  const scrollRef = useRef<ScrollView>(null);
  const theme = useTheme();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    scrollRef.current?.scrollToEnd({ animated: true });

    const reply = await askChatGPT(input);
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
  };

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
          <ScrollView style={styles.chatContainer} ref={scrollRef}>
            {messages.map((msg, idx) => (
              <Card
                key={idx}
                mode="contained"
                style={[
                  styles.messageCard,
                  msg.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage,
                  {
                    backgroundColor:
                      msg.role === 'user'
                        ? theme.colors.primaryContainer
                        : theme.colors.surfaceVariant,
                  },
                ]}
              >
                <Card.Content>
                  <Text variant="bodyMedium">{msg.content}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              mode="outlined"
              placeholder="Введите сообщение"
              value={input}
              onChangeText={setInput}
              style={styles.input}
              theme={{ roundness: 20 }}
            />
            <IconButton
              icon="send"
              mode="contained"
              size={24}
              onPress={handleSend}
              style={styles.sendButton}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  assistantMessage: {
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
});

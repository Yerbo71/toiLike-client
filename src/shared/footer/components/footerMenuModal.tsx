import React, { FC } from 'react';
import {
  Modal,
  Portal,
  Text,
  useTheme,
  IconButton,
  Card,
  Avatar,
} from 'react-native-paper';
import { View } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface Props {
  close: () => void;
}

const FooterMenuModal: FC<Props> = ({ close }) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={close}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 15,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          gap: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="titleMedium">Ordering</Text>
          <IconButton icon="close" onPress={close} />
        </View>
        <TouchableOpacity>
          <Card.Title
            title="Submit application"
            subtitle="Create a request manually"
            left={(props) => <Avatar.Icon {...props} icon="list-status" />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
            style={{
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: theme.colors.surfaceVariant,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            close();
            router.push('/(ordering)/staffOrdering');
          }}
        >
          <Card.Title
            title="Specialist help"
            subtitle="Entrust the organization to a specialist"
            left={(props) => <Avatar.Icon {...props} icon="account-star" />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
            style={{
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: theme.colors.surfaceVariant,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Card.Title
            title="AI help"
            subtitle="Entrust the organization to AI"
            left={(props) => <Avatar.Icon {...props} icon="robot-happy" />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
            style={{
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: theme.colors.surfaceVariant,
            }}
          />
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
};

export default FooterMenuModal;

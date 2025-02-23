import React from 'react';
import { Image, View } from 'react-native';
import DetailAvatar from './components/detailAvatar';
import { Button, Text, useTheme } from 'react-native-paper';
import DetailProfileRateBlock from './components/detailProfileRateBlock';
import DetailProfileAddInfoBlock from './components/detailProfileAddInfoBlock';
import DetailProfileSocialNetBlock from './components/detailProfileSocialNetBlock';

const DetailProfile = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.surface,
        position: 'absolute',
        top: 290,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 15,
      }}
    >
      <DetailAvatar />
      <Text variant="titleLarge" style={{ alignSelf: 'center', marginTop: 50 }}>
        Details
      </Text>
      <DetailProfileRateBlock />
      <Button mode="contained" icon="chat">
        Message
      </Button>
      <DetailProfileAddInfoBlock />
      <DetailProfileSocialNetBlock />
    </View>
  );
};

export default DetailProfile;

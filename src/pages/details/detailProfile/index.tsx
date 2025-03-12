import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import DetailProfileAddInfoBlock from './components/detailProfileAddInfoBlock';
import DetailProfileSocialNetBlock from './components/detailProfileSocialNetBlock';
import { DetailAvatar, DetailRateBlock } from '@/src/shared';

const DetailProfile = () => {
  const theme = useTheme();
  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/701' }}
        style={{ width: '100%', height: 300 }}
        resizeMode="cover"
      />
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
        <Text
          variant="titleLarge"
          style={{ alignSelf: 'center', marginTop: 50 }}
        >
          Details
        </Text>
        <DetailRateBlock />
        <Button mode="contained" icon="chat">
          Message
        </Button>
        <DetailProfileAddInfoBlock />
        <DetailProfileSocialNetBlock />
      </View>
    </View>
  );
};

export default DetailProfile;

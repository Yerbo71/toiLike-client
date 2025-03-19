import React, { useContext } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, useTheme, Text, IconButton } from 'react-native-paper';
import { DetailAvatar, DetailRateBlock } from '@/src/shared';
import ProfileSettings from '@/src/pages/profile/components/profileSettings';
import ProfileTechSupport from '@/src/pages/profile/components/profileTechSupport';
import { AuthContext } from '@/src/context/AuthContext';
const ProfilePage = () => {
  const theme = useTheme();
  const { signOut } = useContext(AuthContext);
  return (
    <ScrollView>
      <Image
        source={{ uri: 'https://picsum.photos/701' }}
        style={{ width: '100%', height: 200 }}
        resizeMode="cover"
      />
      <IconButton
        icon="pencil"
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          backgroundColor: theme.colors.surface,
          zIndex: 100,
        }}
      />
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: theme.colors.surface,
          position: 'absolute',
          top: 190,
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
          style={{ alignSelf: 'center', marginTop: 40 }}
        >
          Profile
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 80,
          marginBottom: 50,
        }}
      >
        <DetailRateBlock />
        <ProfileSettings />
        <ProfileTechSupport />
        <Button
          mode="outlined"
          textColor={theme.colors.error}
          style={{
            borderColor: theme.colors.error,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
          }}
          onPress={() => signOut()}
        >
          Sign out
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

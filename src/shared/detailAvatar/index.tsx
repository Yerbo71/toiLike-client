import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { postUploadAvatarUser } from '@/src/core/rest/user/postUploadAvatarUser';
import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';

interface ProfileAvatarImageProps {
  initialBackgroundUri?: string;
}

export const DetailAvatar: React.FC<ProfileAvatarImageProps> = ({
  initialBackgroundUri,
}) => {
  const { token } = useContext(AuthContext);
  const [avatarUri, setAvatarUri] = useState<string | null>(
    initialBackgroundUri || null,
  );

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      const fileUri = result.assets[0].uri;
      setAvatarUri(fileUri);
      if (token) {
        try {
          await postUploadAvatarUser(token, fileUri);
          console.log('Avatar uploaded successfully!');
        } catch (error) {
          console.error('Failed to upload avatar:', error);
        }
      }
    }
  };

  return (
    <View style={{ position: 'absolute', top: -55, alignSelf: 'center' }}>
      <Avatar.Image
        source={{ uri: avatarUri || 'https://picsum.photos/100' }}
        size={100}
        style={{
          borderStyle: 'solid',
          borderWidth: 0,
          borderColor: 'rgb(0, 95, 175)',
        }}
      />
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Avatar.Icon
          icon="camera"
          size={25}
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: 'rgb(0, 95, 175)',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

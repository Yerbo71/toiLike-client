import React, { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Card, Button, Modal, IconButton } from 'react-native-paper';
import { useI18n } from '@/src/context/LocaleContext';
import { AuthContext } from '@/src/context/AuthContext';
import { getCurrentUser, postTemplate } from '@/src/core/rest/user';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const TemplatesPage = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const { user, token, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<number | null>(null);
  const checkedTemplate = user?.preferedTemplate || 1;

  const templates = [
    { id: 1, image: require('@/assets/templates/template1.png') },
    { id: 2, image: require('@/assets/templates/template2.png') },
    { id: 3, image: require('@/assets/templates/template3.png') },
  ];

  const handleSelectTemplate = async (templateId: number) => {
    try {
      setLoading(templateId);
      await postTemplate(templateId);

      Toast.show({
        type: 'success',
        text1: t('templates.successTitle'),
        text2: t('templates.successMessage'),
      });

      if (token) {
        const updatedUser = await getCurrentUser(token);
        updateUser(updatedUser);
      }
      router.push('/(application)/profile');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || t('templates.errorMessage');
      Toast.show({
        type: 'error',
        text1: t('templates.errorTitle'),
        text2: errorMessage,
      });
    } finally {
      setLoading(null);
    }
  };

  const openPreview = (templateId: number) => {
    setPreviewImage(templateId);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {templates.map((template) => (
          <Card key={template.id} style={styles.card}>
            <TouchableOpacity onPress={() => openPreview(template.id)}>
              <Card.Cover source={template.image} style={styles.image} />
            </TouchableOpacity>

            <Card.Actions style={styles.actions}>
              <Button
                mode="outlined"
                onPress={() => openPreview(template.id)}
                style={styles.previewButton}
              >
                {t('templates.preview')}
              </Button>

              <Button
                mode={
                  checkedTemplate === template.id ? 'outlined' : 'contained'
                }
                onPress={() => handleSelectTemplate(template.id)}
                disabled={loading !== null}
                loading={loading === template.id}
                icon={checkedTemplate === template.id ? 'check' : undefined}
              >
                {loading === template.id
                  ? t('templates.selecting')
                  : checkedTemplate === template.id
                    ? t('templates.selected')
                    : t('templates.select')}
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <Modal
        visible={previewImage !== null}
        onDismiss={closePreview}
        contentContainerStyle={styles.modalContainer}
      >
        {previewImage && (
          <>
            <IconButton
              icon="close"
              onPress={closePreview}
              style={styles.closeButton}
              size={24}
            />
            <Image
              source={templates.find((t) => t.id === previewImage)?.image}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </>
        )}
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    height: 400,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  previewButton: {
    marginRight: 8,
  },
  modalContainer: {
    backgroundColor: 'black',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: width * 0.9,
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 10,
  },
});

export default TemplatesPage;

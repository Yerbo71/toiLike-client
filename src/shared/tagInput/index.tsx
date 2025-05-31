import { useI18n } from '@/src/context/LocaleContext';
import { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';

export const TagInput: FC<{
  values: string[];
  onChange: (emails: string[]) => void;
}> = ({ values, onChange }) => {
  const { t } = useI18n();
  const [newValue, setNewValue] = useState('');

  const addEmail = () => {
    if (newValue.trim() && !values.includes(newValue.trim())) {
      onChange([...values, newValue.trim()]);
      setNewValue('');
    }
  };

  const removeValue = (valueToRemove: string) => {
    onChange(values.filter((tag) => tag !== valueToRemove));
  };

  return (
    <View style={tagStyles.container}>
      <View style={tagStyles.inputContainer}>
        <TextInput
          mode="outlined"
          label={t('system.tags')}
          value={newValue}
          onChangeText={setNewValue}
          style={tagStyles.input}
          keyboardType="default"
          autoCapitalize="none"
          onSubmitEditing={addEmail}
          theme={{ roundness: 10 }}
        />
        <Button
          onPress={addEmail}
          style={tagStyles.addButton}
          mode="text"
          compact
        >
          {t('system.add')}
        </Button>
      </View>

      {values.length > 0 && (
        <View style={tagStyles.emailList}>
          {values.map((tag) => (
            <Chip
              key={tag}
              mode="outlined"
              style={tagStyles.chip}
              onClose={() => removeValue(tag)}
              closeIcon="close"
            >
              {tag}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
};

const tagStyles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    margin: 2,
  },
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
  },
  addButton: {
    justifyContent: 'center',
  },
  emailList: {
    gap: 4,
  },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  emailText: {
    flex: 1,
  },
  removeButton: {
    margin: 0,
    padding: 0,
  },
});

import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useI18n } from '@/src/context/LocaleContext';

interface Cities {
  en: string[];
  ru: string[];
  kk: string[];
}

const cities: Cities = {
  en: [
    'Almaty',
    'Astana',
    'Shymkent',
    'Karaganda',
    'Aktobe',
    'Taraz',
    'Pavlodar',
    'Ust-Kamenogorsk',
    'Semey',
    'Atyrau',
  ],
  ru: [
    'Алматы',
    'Астана',
    'Шымкент',
    'Караганда',
    'Актобе',
    'Тараз',
    'Павлодар',
    'Усть-Каменогорск',
    'Семей',
    'Атырау',
  ],
  kk: [
    'Алматы',
    'Астана',
    'Шымкент',
    'Қарағанды',
    'Ақтөбе',
    'Тараз',
    'Павлодар',
    'Өскемен',
    'Семей',
    'Атырау',
  ],
};

const CountryChoosePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { t, locale } = useI18n();

  const filteredCities =
    cities[locale as keyof Cities]?.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Searchbar
        placeholder={t('system.search')}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredCities}
        keyExtractor={(item, index) => index.toString()}
        style={{
          marginTop: 16,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedCity(item)}>
            <View
              style={{
                padding: 12,
                borderBottomWidth: index !== filteredCities.length - 1 ? 1 : 0,
                borderBottomColor: '#ccc',
                backgroundColor: selectedCity === item ? '#ddd' : 'transparent',
              }}
            >
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CountryChoosePage;

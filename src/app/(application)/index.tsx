import { View } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import HomeCarousel from '@/src/components/home/homeCarousel';

export default function HomeScreen() {
  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });
  return (
    <View>
      <View
        style={{
          paddingTop: 15,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
        }}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Searchbar
              placeholder="Search"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="search"
        />
      </View>
      <HomeCarousel />
    </View>
  );
}

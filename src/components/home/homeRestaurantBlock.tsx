import React from 'react';
import { FlatList, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';
import PreviewCard from '@/src/shared/PreviewCard';
import { restaurants } from '../../constants/mock/restaurants';

const HomeRestaurantBlock = () => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant="titleLarge">Restaurants</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            All
          </Text>
          <Entypo name="chevron-right" size={18} color={theme.colors.primary} />
        </View>
      </View>
      <FlatList
        data={restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15, gap: 10 }}
        renderItem={({ item }) => (
          <PreviewCard
            image={item.image}
            title={item.title}
            description={item.description}
            onPress={() => console.log(`${item.title} clicked`)}
          />
        )}
      />
    </View>
  );
};

export default HomeRestaurantBlock;

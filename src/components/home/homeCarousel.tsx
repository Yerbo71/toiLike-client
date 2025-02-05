import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const images = [
  { uri: 'https://picsum.photos/700' },
  { uri: 'https://picsum.photos/701' },
  { uri: 'https://picsum.photos/702' },
  { uri: 'https://picsum.photos/703' },
];

const HomeSlider = () => {
  return (
    <View>
      <Carousel
        data={images}
        renderItem={({ item }) => <Card.Cover source={{ uri: item.uri }} />}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={380}
        vertical={false}
      />
    </View>
  );
};

export default HomeSlider;

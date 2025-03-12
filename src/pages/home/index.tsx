import React from 'react';
import { ScrollView } from 'react-native';
import HomeSearchBar from '@/src/pages/home/components/homeSearchBar';
import HomeCarousel from '@/src/pages/home/components/homeCarousel';
import HomeRestaurantBlock from '@/src/pages/home/components/homeRestaurantBlock';
import HomeServicesBlock from '@/src/pages/home/components/homeServicesBlock';
import HomeArtistsBlock from '@/src/pages/home/components/homeArtistsBlock';

const HomePage = () => {
  return (
    <ScrollView>
      <HomeSearchBar />
      <HomeCarousel />
      <HomeRestaurantBlock />
      <HomeServicesBlock />
      <HomeArtistsBlock />
    </ScrollView>
  );
};

export default HomePage;

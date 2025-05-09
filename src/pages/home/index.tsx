import React from 'react';
import { ScrollView } from 'react-native';
import HomeSearchBar from '@/src/pages/home/components/homeSearchBar';
import HomeCarousel from '@/src/pages/home/components/homeCarousel';
import HomeEventsBlock from '@/src/pages/home/components/homeEventsBlock';
import HomeVendorsBlock from '@/src/pages/home/components/homeVendorsBlock';
import HomePlacesBlock from '@/src/pages/home/components/homePlacesBlock';

const HomePage = () => {
  return (
    <ScrollView>
      <HomeSearchBar />
      <HomeCarousel />
      <HomeEventsBlock />
      <HomePlacesBlock />
      <HomeVendorsBlock />
    </ScrollView>
  );
};

export default HomePage;

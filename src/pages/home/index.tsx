import React from 'react';
import { ScrollView } from 'react-native';
import HomeSearchBar from '@/src/pages/home/components/homeSearchBar';
import HomeCarousel from '@/src/pages/home/components/homeCarousel';
import HomeEventBlock from '@/src/pages/home/components/homeEventBlock';
import HomeVendorsBlock from '@/src/pages/home/components/homeVendorsBlock';

const HomePage = () => {
  return (
    <ScrollView>
      <HomeSearchBar />
      <HomeCarousel />
      <HomeEventBlock />
      <HomeVendorsBlock />
    </ScrollView>
  );
};

export default HomePage;

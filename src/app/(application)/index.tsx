import { View } from 'react-native';
import HomeCarousel from '@/src/components/home/homeCarousel';
import HomeRestaurantBlock from '@/src/components/home/homeRestaurantBlock';
import HomeSearchBar from '@/src/components/home/homeSearchBar';
import HomeServicesBlock from '@/src/components/home/homeServicesBlock';

export default function HomeScreen() {
  return (
    <View>
      <HomeSearchBar />
      <HomeCarousel />
      <HomeRestaurantBlock />
      <HomeServicesBlock />
      <HomeRestaurantBlock />
    </View>
  );
}

import { ScrollView } from 'react-native';
import HomeCarousel from '@/src/pages/home/homeCarousel';
import HomeRestaurantBlock from '@/src/pages/home/homeRestaurantBlock';
import HomeSearchBar from '@/src/pages/home/homeSearchBar';
import HomeServicesBlock from '@/src/pages/home/homeServicesBlock';
import HomeArtistsBlock from '@/src/pages/home/homeArtistsBlock';

export default function HomeScreen() {
  return (
    <ScrollView>
      <HomeSearchBar />
      <HomeCarousel />
      <HomeRestaurantBlock />
      <HomeServicesBlock />
      <HomeArtistsBlock />
    </ScrollView>
  );
}

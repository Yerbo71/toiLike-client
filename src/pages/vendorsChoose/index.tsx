import React, { useState, useCallback, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Card,
  ActivityIndicator,
  useTheme,
  Button,
  Menu,
  Searchbar,
  Chip,
  TextInput,
} from 'react-native-paper';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '@/src/context/AuthContext';
import { useEvent } from '@/src/context/EventContext';
import { getUserVendorsSearch } from '@/src/core/rest/userVendor';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/src/context/LocaleContext';
import { ErrorView, LoadingView } from '@/src/shared';

type VendorServiceType =
  | 'PRESENTERS'
  | 'SINGERS'
  | 'DANCERS'
  | 'GROUP'
  | 'OPERATORS'
  | 'PHOTOGRAPH'
  | 'MOBILOGRAPH'
  | 'TRANSPORT'
  | 'DECORATORS'
  | 'ANIMATORS'
  | 'TECHNICAL_STAFF'
  | 'SECURITY'
  | 'SOUND_ENGINEERS'
  | 'MEDICAL_WORKERS'
  | 'STYLISTS'
  | 'TECHNICAL_EQUIPMENT'
  | 'HAIR_DRESSERS'
  | 'CLOTHING_SUPPLIERS'
  | 'FLOWER_SUPPLIERS';

const VendorsChoosePage = () => {
  const { token } = useContext(AuthContext);
  const { event, setEvent } = useEvent();
  const theme = useTheme();
  const { t } = useI18n();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState({
    page: 0,
    size: 10,
    q: '',
    serviceType: undefined as VendorServiceType | undefined,
    experience: undefined as string | undefined,
    averageCost: undefined as number | undefined,
  });
  const [searchText, setSearchText] = useState('');
  const [experienceInput, setExperienceInput] = useState('');
  const [costInput, setCostInput] = useState('');
  const [sizeMenuVisible, setSizeMenuVisible] = useState(false);
  const [serviceTypeMenuVisible, setServiceTypeMenuVisible] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const debouncedSearch = useCallback(
    (text: string) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      const timeout = setTimeout(() => {
        setSearchParams((prev) => ({
          ...prev,
          q: text,
          page: 0,
        }));
      }, 500);
      setSearchTimeout(timeout);
    },
    [searchTimeout],
  );

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const handleExperienceChange = (text: string) => {
    setExperienceInput(text);
    const experience = text ? text : undefined;
    setSearchParams((prev) => ({
      ...prev,
      experience,
      page: 0,
    }));
  };

  const handleCostChange = (text: string) => {
    setCostInput(text);
    const averageCost = text ? Number(text) : undefined;
    setSearchParams((prev) => ({
      ...prev,
      averageCost,
      page: 0,
    }));
  };

  const {
    data: vendorsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vendorSearch', searchParams],
    queryFn: () => getUserVendorsSearch(searchParams),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const vendors = vendorsResponse?.list || [];
  const totalPages = vendorsResponse?.totalPages || 0;
  const currentPage = searchParams.page || 0;

  const handleSelectVendor = (vendorId: number) => {
    setSelectedId(vendorId);
    setEvent({ ...event, vendorId } as any);
    router.back();
  };

  const handleViewDetails = (vendorId: number) => {
    router.push({
      pathname: '/(application)/vendorDetails/[id]',
      params: { id: vendorId.toString() },
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setSearchParams((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleSizeChange = (newSize: number) => {
    setSizeMenuVisible(false);
    setSearchParams((prev) => ({ ...prev, size: newSize, page: 0 }));
  };

  const handleServiceTypeChange = (type: VendorServiceType) => {
    setServiceTypeMenuVisible(false);
    setSearchParams((prev) => ({
      ...prev,
      serviceType: type,
      page: 0,
    }));
  };

  const clearServiceTypeFilter = () => {
    setSearchParams((prev) => ({ ...prev, serviceType: undefined, page: 0 }));
  };

  const clearExperienceFilter = () => {
    setExperienceInput('');
    setSearchParams((prev) => ({ ...prev, experience: undefined, page: 0 }));
  };

  const clearCostFilter = () => {
    setCostInput('');
    setSearchParams((prev) => ({ ...prev, averageCost: undefined, page: 0 }));
  };

  const clearAllFilters = () => {
    setSearchText('');
    setExperienceInput('');
    setCostInput('');
    setSearchParams({
      page: 0,
      size: 10,
      q: '',
      serviceType: undefined,
      experience: undefined,
      averageCost: undefined,
    });
  };

  const serviceTypeLabels = {
    PRESENTERS: 'Ведущие',
    SINGERS: 'Певцы',
    DANCERS: 'Танцоры',
    GROUP: 'Группы',
    OPERATORS: 'Операторы',
    PHOTOGRAPH: 'Фотографы',
    MOBILOGRAPH: 'Видеографы',
    TRANSPORT: 'Транспорт',
    DECORATORS: 'Декораторы',
    ANIMATORS: 'Аниматоры',
    TECHNICAL_STAFF: 'Техперсонал',
    SECURITY: 'Охрана',
    SOUND_ENGINEERS: 'Звукорежиссеры',
    MEDICAL_WORKERS: 'Медработники',
    STYLISTS: 'Стилисты',
    TECHNICAL_EQUIPMENT: 'Оборудование',
    HAIR_DRESSERS: 'Визажисты',
    CLOTHING_SUPPLIERS: 'Прокат одежды',
    FLOWER_SUPPLIERS: 'Цветы',
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Поиск по названию"
            value={searchText}
            onChangeText={handleSearchTextChange}
          />
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {/* Service Type Filter */}
          <Menu
            visible={serviceTypeMenuVisible}
            onDismiss={() => setServiceTypeMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setServiceTypeMenuVisible(true)}
                style={styles.filterButton}
                icon="format-list-bulleted-type"
              >
                {searchParams.serviceType
                  ? serviceTypeLabels[searchParams.serviceType]
                  : 'Тип услуги'}
              </Button>
            }
          >
            {Object.entries(serviceTypeLabels).map(([key, label]) => (
              <Menu.Item
                key={key}
                onPress={() =>
                  handleServiceTypeChange(key as VendorServiceType)
                }
                title={label}
              />
            ))}
          </Menu>

          {/* Experience Filter */}
          <View style={styles.inputFilterContainer}>
            <TextInput
              label="Опыт работы (лет)"
              value={experienceInput}
              onChangeText={handleExperienceChange}
              keyboardType="numeric"
              style={styles.inputFilter}
              right={
                experienceInput ? (
                  <TextInput.Icon
                    icon="close"
                    onPress={clearExperienceFilter}
                  />
                ) : null
              }
            />
          </View>

          {/* Average Cost Filter */}
          <View style={styles.inputFilterContainer}>
            <TextInput
              label="Средняя стоимость"
              value={costInput}
              onChangeText={handleCostChange}
              keyboardType="numeric"
              style={styles.inputFilter}
              right={
                costInput ? (
                  <TextInput.Icon icon="close" onPress={clearCostFilter} />
                ) : null
              }
            />
          </View>

          {/* Page Size Filter */}
          <Menu
            visible={sizeMenuVisible}
            onDismiss={() => setSizeMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setSizeMenuVisible(true)}
                style={styles.filterButton}
                icon="format-list-numbered"
              >
                Размер: {searchParams.size}
              </Button>
            }
          >
            <Menu.Item onPress={() => handleSizeChange(10)} title="10" />
            <Menu.Item onPress={() => handleSizeChange(20)} title="20" />
            <Menu.Item onPress={() => handleSizeChange(30)} title="30" />
          </Menu>

          {/* Clear All Button */}
          {(searchParams.q ||
            searchParams.serviceType ||
            searchParams.experience ||
            searchParams.averageCost) && (
            <Button
              mode="outlined"
              onPress={clearAllFilters}
              style={styles.filterButton}
              icon="close"
            >
              Сбросить все
            </Button>
          )}
        </View>

        {isLoading && !vendors.length && <LoadingView />}
        {error && <ErrorView />}

        {/* Vendors List */}
        {vendors.map((vendor) => (
          <Card key={vendor.id} style={styles.card}>
            {vendor.mainImage && (
              <Card.Cover
                source={{ uri: vendor.mainImage }}
                style={styles.cardImage}
              />
            )}
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text variant="titleLarge" style={styles.placeTitle}>
                  {vendor.title}
                </Text>
                {selectedId === vendor.id && (
                  <Icon
                    name="check-circle"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
              </View>

              <View style={styles.tagsContainer}>
                {vendor.serviceType && (
                  <Chip icon="account" style={styles.tag}>
                    {vendor.serviceType}
                  </Chip>
                )}
                {vendor.experience && (
                  <Chip icon="calendar" style={styles.tag}>
                    Опыт: {vendor.experience} лет
                  </Chip>
                )}
                {vendor.averageCost && (
                  <Chip icon="cash" style={styles.tag}>
                    Цена: {vendor.averageCost.toLocaleString()} ₸
                  </Chip>
                )}
                {vendor.rating && (
                  <Chip icon="star" style={styles.tag}>
                    Рейтинг: {vendor.rating}/10
                  </Chip>
                )}
              </View>

              {vendor.description && (
                <Text variant="bodySmall" style={styles.description}>
                  {vendor.description}
                </Text>
              )}

              <View style={styles.buttonsContainer}>
                <Button
                  mode="outlined"
                  onPress={() => handleViewDetails(vendor.id)}
                  style={styles.actionButton}
                >
                  Подробнее
                </Button>
                <Button
                  mode="contained"
                  onPress={() => handleSelectVendor(vendor.id)}
                  style={styles.actionButton}
                >
                  Выбрать
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <Button
            mode="outlined"
            disabled={currentPage === 0}
            onPress={() => handlePageChange(currentPage - 1)}
          >
            Назад
          </Button>
          <Text style={styles.pageText}>
            Страница {currentPage + 1} из {totalPages}
          </Text>
          <Button
            mode="outlined"
            disabled={currentPage >= totalPages - 1}
            onPress={() => handlePageChange(currentPage + 1)}
          >
            Вперед
          </Button>
        </View>

        {isLoading && currentPage > 0 && (
          <ActivityIndicator
            animating={true}
            size="small"
            color={theme.colors.primary}
            style={styles.loadingMore}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  searchContainer: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  inputFilterContainer: {
    flex: 1,
    minWidth: 120,
  },
  inputFilter: {
    backgroundColor: 'white',
  },
  filterButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardImage: {
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  description: {
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  pageText: {
    color: '#666',
  },
  loadingMore: {
    marginVertical: 16,
  },
});

export default VendorsChoosePage;

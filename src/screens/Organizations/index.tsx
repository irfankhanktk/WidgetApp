import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomFlatList from 'components/atoms/custom-flatlist';
import AppHeader from 'components/atoms/headers/app-header';
import { SearchInput } from 'components/atoms/inputs';
import { Loader } from 'components/atoms/loader';
import RegionCard from 'components/molecules/region-card';
import { mvs } from 'config/metrices';
import { navigate } from 'navigation/navigation-ref';
import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, View } from 'react-native';
import { getOrganizations } from 'services/api/api-actions';
import { IOrganizationList, OrganizationCardProps, RegionCardProps } from 'types/entities-types';
import RootStackParamList from 'types/navigation-types/root-stack';
import { UTILS } from 'utils';
import styles from './styles';
import OrganizationCard from 'components/molecules/organization-card';

const PAGE_SIZE = 10; // Number of items per page
type props = NativeStackScreenProps<RootStackParamList, 'Organizations'>;

const Organizations = (props: props) => {
  const { id } = props?.route?.params || {};
  const [organizations, setOrganizations] =
    useState<IOrganizationList | null>();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrganizations = async (
    isQueryChanged: boolean,
    setDataLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setDataLoading(true);
      let pageNo = isQueryChanged ? 1 : pageNumber;
      const res = await getOrganizations(id, pageNo, PAGE_SIZE, searchQuery);
      console.log('loading');
      setOrganizations(preOrganizations =>
        pageNo > 1
          ? {
            ...preOrganizations,
            list: preOrganizations?.list
              ? [...preOrganizations?.list, ...res?.list]
              : [...res?.list],
          }
          : res
      );
    } catch (error) {
      Alert.alert('Region Error', UTILS.returnError(error));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchOrganizations(false, setPageLoading);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchOrganizations(true, setLoading);
  }, []);

  const handleLoadMore = () => {
    const lastPage = Math.ceil((organizations?.totalRecords || 0) / PAGE_SIZE);
    if (!loading && !pageLoading && pageNumber < lastPage) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: OrganizationCardProps) => {
    return (
      <OrganizationCard
        onPress={() => navigate('Products', { id: item?.id })}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader back title={'Organizations'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <SearchInput
              onSubmitEditing={() => fetchOrganizations(true, setLoading)}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search Organizations"
            />
          </View>
          <CustomFlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => fetchOrganizations(true, setRefreshing)} />
            }
            data={organizations?.list || []}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
            ListFooterComponent={pageLoading ? <Loader /> : <></>}
          />
        </View>
      )}
    </View>
  );
};

export default Organizations;

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
import { getRegions } from 'services/api/api-actions';
import { IRegionList, RegionCardProps } from 'types/entities-types';
import RootStackParamList from 'types/navigation-types/root-stack';
import { UTILS } from 'utils';
import styles from './styles';

const PAGE_SIZE = 10; // Number of items per page
type props = NativeStackScreenProps<RootStackParamList, 'Regions'>;

const Regions = (props: props) => {
  const [regions, setRegions] = useState<IRegionList | null>();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRegions = async (
    isQueryChanged: boolean,
    setDataLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      if (isQueryChanged) {
        setPageNumber(1);
      }
      setDataLoading(true);
      let pageNo = isQueryChanged ? 1 : pageNumber;
      const res = await getRegions(pageNo, PAGE_SIZE, searchQuery);
      console.log('loading');
      setRegions(prevRegions =>
        pageNo > 1
          ? {
            ...res,
            list: prevRegions?.list
              ? [...prevRegions?.list, ...res?.list]
              : [...res?.list],
          }
          : res
      );
    } catch (error) {
      console.log('Error in getRegions====>', error);
      Alert.alert('Region Error', UTILS.returnError(error));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchRegions(false, setPageLoading);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchRegions(true, setLoading);
  }, []);

  const handleLoadMore = () => {
    const lastPage = Math.ceil((regions?.totalRecords || 0) / PAGE_SIZE);
    console.log('lastPage::', lastPage);

    if (!loading && !pageLoading && pageNumber < lastPage) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: RegionCardProps) => {
    return (
      <RegionCard
        onPress={() => navigate('Organizations', { id: item?.id })}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Regions'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <SearchInput
              onSubmitEditing={() => fetchRegions(true, setLoading)}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search Regions"
            />
          </View>
          <CustomFlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchRegions(true, setRefreshing)}
              />
            }
            data={regions?.list || []}
            renderItem={renderItem}
            onEndReached={handleLoadMore} // Load more when reaching the end of the list
            // onEndReachedThreshold={0.5} // Load more when the user reaches the last 50% of the list
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

export default Regions;

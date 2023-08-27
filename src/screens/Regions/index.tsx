import { PrimaryButton } from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import AppHeader from 'components/atoms/headers/app-header';
import { SearchInput } from 'components/atoms/inputs';
import { Loader } from 'components/atoms/loader';
import RegionCard from 'components/molecules/region-card';
import { mvs } from 'config/metrices';
import { navigate } from 'navigation/navigation-ref';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { getRegions } from 'services/api/api-actions';
import styles from './styles';
import { Region, RegionCardProps } from 'types/entities-types';
import { UTILS } from 'utils';

const PAGE_SIZE = 10; // Number of items per page

const Regions = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRegions = async (isQueryChanged: boolean, setDataLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setDataLoading(true);
      let pageNo = isQueryChanged ? 1 : pageNumber
      const res = await getRegions(pageNo, PAGE_SIZE, searchQuery);
      console.log('loading');
      setRegions(prevRegions => pageNo > 1 ? [...prevRegions, ...res] : res);
    } catch (error) {
      console.log('Error in getRegions====>', error);
      Alert.alert('Region Error', UTILS.returnError(error))
    } finally {
      Alert.alert('kskj')
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1) { fetchRegions(false, setPageLoading); }
  }, [pageNumber]);

  useEffect(() => {
    fetchRegions(true, setLoading);
  }, []);

  console.log(regions?.length);

  const handleLoadMore = () => {

    console.log('regions?.length % PAGE_SIZE', regions?.length % PAGE_SIZE);

    if (loading || pageLoading) return;
    console.log('regions?.length % PAGE_SIZE', regions?.length % PAGE_SIZE);

    const isLoadMore = regions?.length % PAGE_SIZE == 0;
    if (isLoadMore) {
      Alert.alert('Loadmore')
      setPageNumber(prevPageNumber => prevPageNumber + 1);
      setPageLoading(true);
    }
  };
  console.log('pageLoading:::', pageLoading);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: RegionCardProps) => {
    return <RegionCard onPress={() => navigate('Organizations')} item={item} />;
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Regions'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <SearchInput value={searchQuery} onChangeText={handleSearch} placeholder="Search Regions" />
          </View>
          <FlatList
            data={regions}
            renderItem={renderItem}
            onEndReached={handleLoadMore} // Load more when reaching the end of the list
            // onEndReachedThreshold={0.5} // Load more when the user reaches the last 50% of the list
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
            ListFooterComponent={pageLoading && <Loader />}
          />

        </View>
      )}
    </View>
  );
};

export default Regions;

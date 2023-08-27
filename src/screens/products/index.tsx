import CustomFlatList from 'components/atoms/custom-flatlist';
import AppHeader from 'components/atoms/headers/app-header';
import { SearchInput } from 'components/atoms/inputs';
import { Loader } from 'components/atoms/loader';
import { mvs } from 'config/metrices';
import { navigate } from 'navigation/navigation-ref';
import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { PrimaryButton } from 'components/atoms/buttons';
import ProductCard from 'components/molecules/product-card';
import { getProducts } from 'services/api/api-actions';
import { IProductList, ProductCardProps } from 'types/entities-types';
import { UTILS } from 'utils';
import styles from './styles';
import RootStackParamList from 'types/navigation-types/root-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const PAGE_SIZE = 10; // Number of items per page
type props = NativeStackScreenProps<RootStackParamList, 'Products'>;
const Products = (props: props) => {
  const { id } = props?.route?.params || {};
  const isFocus = useIsFocused();
  const [products, setProducts] = useState<IProductList | null>();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (
    isQueryChanged: boolean,
    setDataLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setDataLoading(true);
      let pageNo = isQueryChanged ? 1 : pageNumber;
      const res = await getProducts(id, pageNo, PAGE_SIZE, searchQuery);
      console.log('loading');
      setProducts(preProducts =>
        pageNo > 1
          ? {
            ...preProducts,
            list: preProducts?.list
              ? [...preProducts?.list, ...res?.list]
              : [...res?.list],
          }
          : res
      );
    } catch (error) {
      console.log('Error in getProducts====>', error);
      Alert.alert('Region Error', UTILS.returnError(error));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1) {
      fetchProducts(false, setPageLoading);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (isFocus) {
      fetchProducts(true, setLoading);
    }
  }, [isFocus]);

  const handleLoadMore = () => {
    const lastPage = Math.ceil((products?.totalRecords || 0) / PAGE_SIZE);
    if (!loading && !pageLoading && pageNumber < lastPage) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: ProductCardProps) => {
    return (
      <ProductCard
        onPress={() => navigate('ProductDetails', { id: item?.id })}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader back title={'Products'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <SearchInput
              onSubmitEditing={() => fetchProducts(true, setLoading)}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search Products"
            />
          </View>
          <CustomFlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => fetchProducts(true, setRefreshing)} />
            }
            data={products?.list || []}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
            ListFooterComponent={pageLoading ? <Loader /> : <></>}
          />
          <View style={styles.btnContainer}>
            <PrimaryButton
              containerStyle={{ borderRadius: 30, width: 60, height: 60 }}
              onPress={() => navigate('AddProduct', { organizationId: id })}
              title={'+'}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Products;

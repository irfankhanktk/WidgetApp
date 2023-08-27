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
import { getProducts, } from 'services/api/api-actions';
import styles from './styles';
import { Product, ProductCardProps, } from 'types/entities-types';
import { UTILS } from 'utils';

const PAGE_SIZE = 10; // Number of items per page

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (isQueryChanged: boolean, setDataLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setDataLoading(true);
      if (isQueryChanged && pageNumber !== 1) {
        setPageNumber(1);
      }
      let pageNo = isQueryChanged ? 1 : pageNumber
      const res = await getProducts(pageNo, PAGE_SIZE, searchQuery);
      setProducts(prevProducts => pageNo > 1 ? [...prevProducts, ...res] : res);
    } catch (error) {
      console.log('Error in getProducts====>', error);
      Alert.alert('Products Error', UTILS.returnError(error))
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1 && !pageLoading) { fetchProducts(false, setPageLoading); }
  }, [pageNumber]);

  useEffect(() => {
    fetchProducts(true, setLoading);
  }, [searchQuery]);

  console.log(products?.length);

  const handleLoadMore = () => {
    // if (loading || pageLoading) return;
    // console.log('regions?.length % PAGE_SIZE', regions?.length % PAGE_SIZE);

    // const isLoadMore = regions?.length % PAGE_SIZE == 0;
    // if (isLoadMore) {
    //   setPageNumber(prevPageNumber => prevPageNumber + 1);
    // }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: ProductCardProps) => {
    return <RegionCard item={item} />;
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
            data={products}
            renderItem={renderItem}
            onEndReached={handleLoadMore} // Load more when reaching the end of the list
            onEndReachedThreshold={0.5} // Load more when the user reaches the last 50% of the list
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

export default Products;





// import CustomFlatList from 'components/atoms/custom-flatlist';
// import {mvs} from 'config/metrices';
// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import Bold from 'typography/bold-text';
// import Regular from 'typography/regular-text';
// import styles from './styles';
// import {colors} from 'config/colors';
// import {SearchInput} from 'components/atoms/inputs';
// import {PrimaryButton} from 'components/atoms/buttons';
// import {navigate} from 'navigation/navigation-ref';
// import AppHeader from 'components/atoms/headers/app-header';
// const Products = () => {
//   const data = [
//     {
//       id: 1,
//       productName: 'SmartGear Watch',
//       productDescription:
//         'The SmartGear Watch is a stylish and feature-packed wearable device that keeps you connected, tracks your health and fitness',
//     },
//     {
//       id: 2,
//       productName: 'EcoTech Blender',
//       productDescription:
//         'The EcoTech Blender is a powerful kitchen appliance designed for eco-conscious individuals.',
//     },
//     {
//       id: 3,
//       productName: 'ProFit Gym Kit',
//       productDescription:
//         'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.',
//     },
//     {
//       id: 3,
//       productName: 'ProFit Gym Kit',
//       productDescription:
//         'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.',
//     },
//     {
//       id: 3,
//       productName: 'ProFit Gym Kit',
//       productDescription:
//         'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.',
//     },
//     {
//       id: 3,
//       productName: 'ProFit Gym Kit',
//       productDescription:
//         'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.',
//     },
//   ];
//   const renderProducts = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigate('ProductDetails')}
//         style={styles.flatlistContainer}>
//         <View style={{flex: 1}}>
//           <Bold label={'Id :'} />
//           <Regular label={'productName :'} />
//           <Regular label={'productDescription :'} />
//         </View>
//         <View style={{flex: 1}}>
//           <Bold label={item?.id} />
//           <Regular label={item?.productName} />
//           <Regular numberOfLines={3} label={item?.productDescription} />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader title={'Products'} back />
//       <View style={{paddingHorizontal: mvs(20)}}>
//         <SearchInput placeholder="Search Products" />
//       </View>
//       <CustomFlatList
//         showsVerticalScrollIndicator={false}
//         data={data}
//         renderItem={renderProducts}
//         contentContainerStyle={{
//           paddingBottom: mvs(20),
//           paddingHorizontal: mvs(20),
//         }}
//       />
//       <View style={styles.btnContainer}>
//         <PrimaryButton
//           containerStyle={{borderRadius: 30, width: 60, height: 60}}
//           onPress={() => navigate('AddProduct')}
//           title={'+'}
//         />
//       </View>
//     </View>
//   );
// };
// export default Products;

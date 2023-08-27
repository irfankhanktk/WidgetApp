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
import { getOrganizations, } from 'services/api/api-actions';
import styles from './styles';
import { Organization, OrganizationCardProps, } from 'types/entities-types';
import { UTILS } from 'utils';

const PAGE_SIZE = 10; // Number of items per page

const Organizations = () => {
  const [organization, setOrganization] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrganization = async (isQueryChanged: boolean, setDataLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setDataLoading(true);
      if (isQueryChanged && pageNumber !== 1) {
        setPageNumber(1);
      }
      let pageNo = isQueryChanged ? 1 : pageNumber
      const res = await getOrganizations(pageNo, PAGE_SIZE, searchQuery);
      setOrganization(prevOrganization => pageNo > 1 ? [...prevOrganization, ...res] : res);
    } catch (error) {
      console.log('Error in getOrganization====>', error);
      Alert.alert('Organization Error', UTILS.returnError(error))
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1 && !pageLoading) { fetchOrganization(false, setPageLoading); }
  }, [pageNumber]);

  useEffect(() => {
    fetchOrganization(true, setLoading);
  }, [searchQuery]);

  console.log(organization?.length);

  const handleLoadMore = () => {
    // if (loading || pageLoading) return;
    // console.log('organization?.length % PAGE_SIZE', organization?.length % PAGE_SIZE);

    // const isLoadMore = organization?.length % PAGE_SIZE == 0;
    // if (isLoadMore) {
    //   setPageNumber(prevPageNumber => prevPageNumber + 1);
    // }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item, index }: OrganizationCardProps) => {
    return <RegionCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Organizations'} />
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <SearchInput value={searchQuery} onChangeText={handleSearch} placeholder="Search Organizations" />
          </View>
          <FlatList
            data={organization}
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

export default Organizations;






// import CustomFlatList from 'components/atoms/custom-flatlist';
// import {mvs} from 'config/metrices';
// import React from 'react';
// import {View, Text} from 'react-native';
// import Bold from 'typography/bold-text';
// import Regular from 'typography/regular-text';
// import styles from './styles';
// import {colors} from 'config/colors';
// import {SearchInput} from 'components/atoms/inputs';
// import {PrimaryButton} from 'components/atoms/buttons';
// import {navigate} from 'navigation/navigation-ref';
// import AppHeader from 'components/atoms/headers/app-header';
// const Organizations = () => {
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
//   ];
//   const renderProducts = ({item}) => {
//     return (
//       <View style={styles.flatlistContainer}>
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
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader title={'Organizations'} back />
//       <View style={{paddingHorizontal: mvs(20)}}>
//         <SearchInput placeholder="Search Organizations" />
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
//           onPress={() => navigate('Products')}
//           title={'Products'}
//         />
//       </View>
//     </View>
//   );
// };
// export default Organizations;

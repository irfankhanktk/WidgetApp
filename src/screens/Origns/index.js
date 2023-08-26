import CustomFlatList from 'components/atoms/custom-flatlist';
import {mvs} from 'config/metrices';
import React from 'react';
import {View, Text} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import {SearchInput} from 'components/atoms/inputs';
import {PrimaryButton} from 'components/atoms/buttons';
import {navigate} from 'navigation/navigation-ref';
import AppHeader from 'components/atoms/headers/app-header';

const Origns = () => {
  const data = [
    {
      id: 1,
      productName: 'SmartGear Watch',
      productDescription:
        'The SmartGear Watch is a stylish and feature-packed wearable device that keeps you connected, tracks your health and fitness',
    },
    {
      id: 2,
      productName: 'EcoTech Blender',
      productDescription:
        'The EcoTech Blender is a powerful kitchen appliance designed for eco-conscious individuals.',
    },
    {
      id: 3,
      productName: 'ProFit Gym Kit',
      productDescription:
        'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.',
    },
  ];
  const renderProducts = ({item}) => {
    return (
      <View style={styles.flatlistContainer}>
        <View style={{flex: 1}}>
          <Bold label={'Id :'} />
          <Regular label={'productName :'} />
          <Regular label={'productDescription :'} />
        </View>
        <View style={{flex: 1}}>
          <Bold label={item?.id} />
          <Regular label={item?.productName} />
          <Regular numberOfLines={3} label={item?.productDescription} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Regions'} back />
      <View style={{paddingHorizontal: mvs(20)}}>
        <SearchInput placeholder="Search Regions" />
      </View>
      <CustomFlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderProducts}
        contentContainerStyle={{
          paddingBottom: mvs(20),
          paddingHorizontal: mvs(20),
        }}
      />
      <View style={styles.btnContainer}>
        <PrimaryButton
          onPress={() => navigate('Organizations')}
          title={'Regions'}
        />
      </View>
    </View>
  );
};
export default Origns;

import CustomFlatList from 'components/atoms/custom-flatlist';
import {mvs} from 'config/metrices';
import React from 'react';
import {View, Text} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import PrimaryInput from 'components/atoms/inputs';
import {PrimaryButton} from 'components/atoms/buttons';
import {navigate} from 'navigation/navigation-ref';
import AppHeader from 'components/atoms/headers/app-header';

const AddProduct = () => {
  return (
    <View style={styles.container}>
      <AppHeader title={'Add Product'} back />
      <View style={{paddingHorizontal: mvs(20), marginTop: mvs(50)}}>
        <PrimaryInput placeholder="Product Name" />
        <PrimaryInput placeholder="Product Description" />
        <PrimaryButton title="Add Product" />
      </View>
    </View>
  );
};
export default AddProduct;

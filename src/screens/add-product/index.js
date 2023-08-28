import {PrimaryButton} from 'components/atoms/buttons';
import AppHeader from 'components/atoms/headers/app-header';
import PrimaryInput from 'components/atoms/inputs';
import {mvs} from 'config/metrices';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';

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

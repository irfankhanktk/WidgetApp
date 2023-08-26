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
import {Row} from 'components/atoms/row';

const ProductDetails = ({props}) => {
  const data = props;
  console.log('dara=====>', data);
  return (
    <View style={styles.container}>
      <AppHeader title={'Product Details'} back />
      <View
        style={{
          paddingHorizontal: mvs(20),
        }}>
        <Row
          style={{
            borderWidth: 1,
            padding: mvs(10),
            borderRadius: mvs(10),
            borderColor: colors.primary,
          }}>
          <View>
            <Bold label={'Id'} />
            <Regular style={{marginTop: 10}} label={'Name'} />
            <Regular style={{marginTop: 10}} label={'Description'} />
          </View>
          <View style={{flex: 1, marginLeft: mvs(30)}}>
            <Bold label={'2'} />
            <Regular style={{marginTop: 10}} label={'ProFit Gym Kit'} />
            <Regular
              style={{marginTop: 10}}
              numberOfLines={3}
              label={
                'The ProFit Gym Kit is the ultimate fitness companion, including premium workout gear.'
              }
            />
          </View>
        </Row>
        <PrimaryButton
          onPress={() => navigate('AddProduct')}
          containerStyle={{marginTop: mvs(40)}}
          title="Edit Product"
        />
        <PrimaryButton
          containerStyle={{marginTop: mvs(10)}}
          title="Delete Product"
        />
        {/* <PrimaryButton containerStyle={{marginTop: mvs(10)}} title='' /> */}
      </View>
    </View>
  );
};
export default ProductDetails;

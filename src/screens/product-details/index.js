import CustomFlatList from 'components/atoms/custom-flatlist';
import {mvs} from 'config/metrices';
import React from 'react';
import {View, Text, Alert} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import {SearchInput} from 'components/atoms/inputs';
import {PrimaryButton} from 'components/atoms/buttons';
import {navigate} from 'navigation/navigation-ref';
import AppHeader from 'components/atoms/headers/app-header';
import {Row} from 'components/atoms/row';
import {UTILS} from 'utils';
import {getProductDetails, onDeleteProduct} from 'services/api/api-actions';
import {ScrollView} from 'react-native';
import {Loader} from 'components/atoms/loader';
import {useIsFocused} from '@react-navigation/native';

const ProductDetails = props => {
  const isFocus = useIsFocused();
  const {id} = props?.route?.params || {};
  const [loading, setLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductDetails(id);
      console.log('res:::', res);
      setProduct(res);
    } catch (error) {
      console.log('error:::', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocus) fetchProduct();
  }, [isFocus]);

  const deleteProduct = () => {
    Alert.alert('Alert', 'Are you sure to delete this product?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            setDeleteLoading(true);
            const res = await onDeleteProduct(id);
            Alert.alert('Delete', 'You have deleted a product successfully');
          } catch (error) {
            console.log('error:::', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
          } finally {
            setDeleteLoading(false);
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <AppHeader title={'Product Details'} back />
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(20)}}>
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
                <Bold label={product?.id} />
                <Regular style={{marginTop: 10}} label={product?.productName} />
                <Regular
                  style={{marginTop: 10}}
                  numberOfLines={null}
                  label={product?.productDescription}
                />
              </View>
            </Row>
            <PrimaryButton
              onPress={() => navigate('AddProduct', {product})}
              containerStyle={{marginTop: mvs(40)}}
              title="Edit Product"
            />
            <PrimaryButton
              loading={deleteLoading}
              onPress={deleteProduct}
              containerStyle={{marginTop: mvs(10)}}
              title="Delete Product"
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default ProductDetails;

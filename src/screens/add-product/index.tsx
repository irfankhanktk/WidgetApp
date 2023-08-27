import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from 'components/atoms/buttons';
import AppHeader from 'components/atoms/headers/app-header';
import PrimaryInput from 'components/atoms/inputs';
import { mvs } from 'config/metrices';
import React from 'react';
import { Alert, View } from 'react-native';
import { addUpdateProduct } from 'services/api/api-actions';
import { Product } from 'types/entities-types';
import RootStackParamList from 'types/navigation-types/root-stack';
import { UTILS } from 'utils';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;

const AddProduct = (props: props) => {
  const { organizationId, product } = props?.route?.params || {};
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    organizationId: organizationId,
    productName: '',
    productDescription: '',
  }
  const [productData, setProductData] = React.useState<Product>({
    ...initialValues,
    ...product,
  });
  const onSubmitHandle = async () => {
    try {
      setLoading(true);
      const res = await addUpdateProduct(productData);
      Alert.alert(
        'Congratulations',
        `Product is ${productData?.id ? 'updated' : 'added'} Successfully`
      );
      if (!productData?.id)
        setProductData(initialValues);
    } catch (error) {
      console.log('error:::', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'Add Product'} back />
      <View style={{ paddingHorizontal: mvs(20), marginTop: mvs(50) }}>
        <PrimaryInput
          value={productData?.productName}
          placeholder="Product Name"
          onChangeText={str =>
            setProductData(prev => ({ ...prev, productName: str }))
          }
        />
        <PrimaryInput
          value={productData?.productDescription}
          placeholder="Product Description"
          onChangeText={str =>
            setProductData(prev => ({ ...prev, productDescription: str }))
          }
        />
        <PrimaryButton
          loading={loading}
          onPress={onSubmitHandle}
          title="Add Product"
        />
      </View>
    </View>
  );
};
export default AddProduct;

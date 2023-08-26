import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Splash from 'screens/splash';
import {horizontalAnimation} from '../utils';
import Origns from 'screens/Origns';
import Products from 'screens/products';
import Organizations from 'screens/Organizations';
import ProductDetails from 'screens/product-details';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Origns" component={Origns} />
        <Stack.Screen name="Organizations" component={Organizations} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

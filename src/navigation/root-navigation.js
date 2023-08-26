import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Splash from 'screens/splash';
import {horizontalAnimation} from '../utils';
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
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

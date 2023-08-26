import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SplashIcon } from 'assets/icons';
import { mvs, width } from 'config/metrices';
import React from 'react';
import { View } from 'react-native';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {


  return (
    <View style={{ ...styles.container }}>
      <SplashIcon width={width - mvs(60)} />
    </View>
  );
};
export default Splash;

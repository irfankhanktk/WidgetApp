import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SplashIcon } from 'assets/icons';
import { mvs, width } from 'config/metrices';
import { useAppDispatch } from 'hooks/use-store';
import React from 'react';
import { View } from 'react-native';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { navigate } from 'navigation/navigation-ref';
import Regular from 'typography/regular-text';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;
  React.useEffect(() => {
    setTimeout(() => {
      navigation?.replace('Regions');
    }, 2000);
  }, [])



  return (
    <View style={{ ...styles.container }}>
      <Regular label={'Welcome'} />
    </View>
  );
};
export default Splash;

import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import Medium from 'typography/medium-text';
import { Row } from '../row';

interface AppHeaderProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  name?: string;
  icon?: boolean;
  back?: boolean;
  onChangeText?: (text: string) => void;
  isSearch?: boolean;
  placeholder?: string;
  onPress?: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({
  style = {},
  title,
  back = false,
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <Row style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          {back && (
            <FontAwesome5
              name={'arrow-left'}
              size={mvs(20)}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>


        <Medium fontSize={mvs(20)} label={`${title}`} style={[styles.title]} />
        <View />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(15),
  },
  title: {
    fontSize: mvs(18),
  },
});

export default React.memo(AppHeader);

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import Regular from 'typography/regular-text';
import {SearchInput} from '../inputs';
import {Row} from '../row';
import Medium from 'typography/medium-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AppHeader = ({
  style = {},
  title,
  name,
  icon = false,
  back = false,
  onChangeText = t => {},
  isSearch = false,
  placeholder = 'Search',
  unreadNotification,
  notification,
  onPress,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          {back && (
            <FontAwesome5
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              size={mvs(20)}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>

        {title ? (
          <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
        ) : (
          <></>
        )}
        {icon ? (
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <AntDesign
              name={'sharealt'}
              size={mvs(20)}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </Row>
    </View>
  );
};
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(15),
  },
  notificationbadge: {
    backgroundColor: colors.red,
    borderColor: colors.primary,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: mvs(6),
    right: mvs(-3),
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(15),
    width: mvs(15),
    borderRadius: mvs(7.5),
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(18),
  },
  back: {},
});

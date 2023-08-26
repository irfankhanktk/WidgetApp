import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatlistContainer: {
    borderColor: colors.primary,
    borderWidth: mvs(1),
    marginTop: mvs(10),
    flexDirection: 'row',
    padding: mvs(10),
    justifyContent: 'flex-start',
    borderRadius: mvs(10),
  },
  btnContainer: {
    flex: 1,
    right: mvs(20),
    paddingHorizontal: mvs(20),
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 50,
  },
});
export default styles;

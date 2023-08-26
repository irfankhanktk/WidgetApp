import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatlistContainer: {
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: mvs(20),
    marginBottom: mvs(30),
  },
});
export default styles;

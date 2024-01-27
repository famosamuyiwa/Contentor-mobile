import { StyleSheet } from 'react-native'
import { RPP } from '../../../utils';
export const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: RPP(10),
    height: RPP(40),
    borderRadius: RPP(20),
    flexDirection: 'row',
    alignItems: "center"
  },
  inputStyle: {
    flex: RPP(1),
    fontSize: RPP(14),
    fontFamily: "Satoshi_Regular"
  },
  iconStyle: {
    fontSize: RPP(16),
    alignSelf: 'center',
    marginHorizontal: RPP(15),
    color: 'grey'
  }
});

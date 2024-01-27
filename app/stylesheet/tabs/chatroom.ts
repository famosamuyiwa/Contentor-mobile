import { StyleSheet } from 'react-native'
import { RPH, RPP, RPW } from '../../../utils'

const styles = StyleSheet.create({
   header:{
      flexDirection: "row",
      paddingVertical: RPP(10),
      alignItems:'center',
      borderBottomWidth: RPP(0.5),
      borderColor: "lightgrey"
  },
  avatar:{
   height: RPP(40),
   width: RPP(40),
   borderRadius: RPP(20),
   marginHorizontal: RPP(10)
 },

 name:{
   fontFamily:"Satoshi_Black",
   fontSize: RPP(20)
 }

})

export default styles
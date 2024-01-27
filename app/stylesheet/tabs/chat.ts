import { StyleSheet } from 'react-native'
import { RPH, RPP, RPW } from '../../../utils'

const styles = StyleSheet.create({
   header:{
    fontSize: RPP(30),
    fontFamily: "Satoshi_Bold"
   },
   headerIconContainer:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginTop: RPP(10)
   }
})

export default styles
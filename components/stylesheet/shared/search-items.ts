import { StyleSheet } from 'react-native'
import { RPP } from '../../../utils';
export const styles = StyleSheet.create({
  innerContainer:{
    flexDirection:"row",
    alignItems:"center",
    borderBottomColor:"lightgrey",
    marginBottom:10,
    paddingBottom:10,
  },
  iconContainer2:{
    paddingRight:20,
    paddingVertical:20,
  },
  infoContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  avatar:{
    height: RPP(50),
    width: RPP(50),
    borderRadius: RPP(25)
  }

});

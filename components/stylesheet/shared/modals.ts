import { StyleSheet } from "react-native";
import { RPH, RPP } from "../../../utils";


export const styles = StyleSheet.create({

    modalContent: {
        height: RPH(40),
        width: '100%',
        borderTopRightRadius: RPP(18),
        borderTopLeftRadius: RPP(18),
        position: 'absolute',
        bottom: 0,
        shadowOffset:{ width:0, height:2 }, shadowOpacity:0.25, shadowRadius:5,
        padding: RPP(20),
      },
      titleContainer: {
        height: '16%',
        borderTopRightRadius: RPP(50),
        borderTopLeftRadius: RPP(50),
        paddingHorizontal: RPP(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      title: {
        fontSize: RPP(16),
      },

      backgroundDim:{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)"
      },

      container:{
        justifyContent: "space-around",
        alignItems: "center",
        flex:1
      }
})
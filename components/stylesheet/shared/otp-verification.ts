import { StyleSheet } from "react-native";
import { RPP, RPW } from "../../../utils";

export const styles = StyleSheet.create({
    wrapper:{
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        paddingHorizontal: RPW(5),
        paddingBottom: RPP(30)
    },
    container3:{
        width: '100%',
        paddingVertical: RPP(50)
    },
    backBtnBorder:{
        padding: RPP(5),
        borderWidth: RPP(0.5),
        borderRadius: RPP(10)
    },
    otpInputContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical: RPP(25)
    },
    otpInput:{
        width: '20%'
    }
})
import { StyleSheet } from "react-native";
import { RPP } from "../../../utils";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        borderWidth: RPP(0.5),
        borderRadius: RPP(10),
        alignItems: "center",
        justifyContent:"center"
    },
    container2:{
        flexDirection:"row",
        alignItems: "center",
        width: "50%",
    },
    item:{
        paddingRight: RPP(20)
    }
})
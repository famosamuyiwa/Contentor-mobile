import { StyleSheet } from "react-native";
import { RPH, RPP } from "../../../utils";

export const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems: "center",
        marginTop: RPP(5)
    },
    textInput:{
        padding: RPP(15),
    },
    titleWrapper:{
        paddingTop: RPP(15),
        paddingRight: RPP(15),
        paddingBottom: RPP(15),
        width: '30%'
    },
    inputWrapper:{
        flex:1,
        borderColor: "lightgrey",
    },
    titleText:{
        fontFamily:"Satoshi_Bold"
    }
})
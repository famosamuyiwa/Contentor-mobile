import { StyleSheet } from "react-native";
import { RPH, RPP } from "../../../utils";

export const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:"100%",         
        borderRadius: RPP(10),
    },
    video:{
        width:"100%",
        height:"100%",         
        borderRadius: RPP(10),
    },
    imageWrapper:{
        width:"31%",
        height:RPP(200),
    },
    imageWrapper2:{
        width:"30%",
        height: RPH(10)
    },
    textWrapper:{
        flex:1
    },
    folderContainer:{
        flexDirection:"row",
        borderBottomWidth: RPP(0.4),
        borderColor: "lightgrey",
        paddingVertical: RPP(10)
    },
    playBtn:{
        fontSize: RPP(20),
        position: "absolute",
        right: RPP(5),
        bottom: RPP(5),
        color:"white"
    }
})
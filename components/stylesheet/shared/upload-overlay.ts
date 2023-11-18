import { StyleSheet } from "react-native";
import { RPP } from "../../../utils";

export const styles = StyleSheet.create({
    container:{
        alignItems: "center", 
        justifyContent: "center",
        zIndex:1,
    },
    containerMock:{
        alignItems: "center", 
        justifyContent: "center",
        zIndex:1,
        backgroundColor: "rgba(0,0,0,0.9)",
        paddingVertical: RPP(16),
        rowGap: RPP(12)
    }
})
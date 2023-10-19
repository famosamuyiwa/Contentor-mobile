import { StyleSheet } from 'react-native'
import { RPP } from '../../../utils'



const styles = StyleSheet.create({
    textInput:{
        borderWidth: RPP(0.5),
        borderRadius: RPP(10),
        padding: RPP(15),
        marginTop: RPP(10),
        fontFamily: "Satoshi_Regular"
    },
    label:{
        fontFamily: "Satoshi_Medium",
    },
    passwordVisibilityIcon:{
        position:"absolute",
        alignSelf:"flex-end",
        padding:RPP(15),
        bottom:0
    },
    passwordIcon:{
        fontSize: RPP(20)
    }
})

export default styles
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
    }
})

export default styles
import { StyleSheet } from 'react-native'
import { RPP } from '../../utils'

const templateStyles = StyleSheet.create({
    buttonSize:{
        height: RPP(50),
        width: "100%",
        marginVertical: RPP(8)
    },
    wrapper: {
        width: "100%",
        height: "100%"
    },
    heading:{
        fontSize: RPP(20),
        fontFamily: "Satoshi_Bold"
    },
})

export default templateStyles
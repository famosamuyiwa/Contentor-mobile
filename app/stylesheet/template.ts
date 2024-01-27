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
    wrapper2: {
        width: "100%",
        height: "100%",
        paddingTop: RPP(30)
    },
    backBtnBorder:{
        padding: RPP(5),
        borderWidth: RPP(0.5),
        borderRadius: RPP(10)
    },
})

export default templateStyles
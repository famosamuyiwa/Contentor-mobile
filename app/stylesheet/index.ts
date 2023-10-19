import { StyleSheet } from 'react-native'
import { RPP, RPW } from '../../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: RPW(5),
        paddingBottom: RPP(30)
    },
    container2:{
        width: '100%'
    },
    container3:{
        width: '100%',
        paddingVertical: RPP(50)
    },
    icon:{
        fontSize: RPP(25)
    },
    icon2:{
        fontSize: RPP(20)
    },
    separator: {
        marginVertical: RPP(30),
        height: RPP(1),
        width: '100%',
    },
    separatorText:{
        paddingHorizontal: RPP(10),
        position:'absolute',
        fontSize: RPP(12)
    },
    separatorContainer:{
        width:"100%",
        height: RPP(35),
        alignItems:"center",
        justifyContent:"center",
    },
    backBtnBorder:{
        padding: RPP(5),
        borderWidth: RPP(0.5),
        borderRadius: RPP(10)
    },
    heading:{
        fontSize: RPP(20),
        fontFamily: "Satoshi_Bold"
    },
    subheading:{
        marginTop: RPP(8),
        marginBottom: RPP(30),
        fontFamily: "Satoshi_Light"
    }
})

export default styles
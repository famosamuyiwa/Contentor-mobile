import { StyleSheet } from 'react-native'
import { RPH, RPP, RPW } from '../../utils'

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        flexDirection: "row",
        justifyContent:"space-between",
        paddingVertical: RPP(10),
        marginTop: RPP(30),
        alignItems:'center',
        paddingHorizontal: RPP(10)
    },
    headerText:{
        fontSize: RPP(16),
        fontFamily:"Satoshi_Black"
    },
    headerActionText:{
        fontFamily:"Satoshi_Medium"
    },
    headerActionContainer:{
        width:"15%"
    },
    contentContainer:{
        height: RPH(15),
        borderBottomWidth: RPP(0.4),
        borderColor: "darkgrey",
        flexDirection: "row"
    },
    mediaContainer:{
        width: "30%",
        alignItems: "center"
    },
    captionContainer:{
        flexDirection: "row",
        flex:1,
        paddingRight: RPP(10),
        paddingVertical: RPP(10)
    },
    image:{
        height: "80%",
        width: "80%"
    },
    textInput:{

    },
    coverLabel:{
        position: 'absolute',
        bottom: 10,
        height: "30%",
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: "5%"
    },
    label:{
        color: "white",
        fontFamily:"Satoshi_Bold"
    }
})

export default styles
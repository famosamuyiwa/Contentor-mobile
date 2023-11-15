import { StyleSheet } from 'react-native'
import { RPP, RPW } from '../../utils'

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: RPP(10)
    },
    header:{
        flexDirection: "row",
        justifyContent:"space-between",
        paddingVertical: RPP(10)
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
    profileImage:{
        width: RPP(120),
        height: RPP(120),
        borderRadius: RPP(60),

    },
    profileDefaultImage:{
        width: RPP(120),
        height: RPP(120),
        borderRadius: RPP(60),
        justifyContent:"center",
        alignItems:"center",
    },
    profileImageContainer:{
        flexDirection:"row",
        justifyContent:"center",
        marginVertical: RPP(20),        
    },
    cameraPlusIcon:{
        position:'absolute',
        zIndex:1,
        fontSize: RPP(40),
        color: "rgba(255, 255, 255, 1)",
        bottom:0,
        right: 10,
        width: RPP(30),
        height: RPP(30),
        borderRadius: RPP(15),
        justifyContent:"center",
        alignItems:"center"
    },
    cameraDefaultIcon:{
        fontSize: RPP(40)
    },
    informationContainer:{
        borderColor: "lightgrey",
        borderTopWidth: RPP(0.4),
        borderBottomWidth: RPP(0.4),
        marginTop: RPP(20),
        paddingHorizontal: RPP(10)
    }
})

export default styles
import { StyleSheet } from 'react-native'
import { RPH, RPP, RPW } from '../../../utils'

const styles = StyleSheet.create({
    container:{
        borderTopRightRadius: RPP(24),
        width: '100%',
        marginTop: RPH(30),
        minHeight: RPH(70),
        paddingHorizontal: RPP(10)

    },
    profileImage:{
        width: RPP(80),
        height: RPP(80),
        borderRadius: RPP(40)
    },
    profileImageWrapper:{
        padding: RPP(5),
        borderRadius: RPP(90),
        justifyContent: "center",
        alignItems: "center",
        width: RPP(90),
        marginTop: RPP(-40),
    },
    editIconWrapper:{
        position:"absolute",
        right: RPP(20),
        top: RPP(20)
    },
    tabFilter:{
        flexDirection:"row",
        marginTop:RPP(20),
        alignItems: "center",
    },
    tab:{
        flex:1,
        justifyContent:"center",
        flexDirection:"row",
        paddingBottom: RPP(10),
        borderBottomWidth: RPP(1.5)
    },
    addBtn:{
        width: RPP(50),
        height: RPP(50),
        borderRadius: RPP(25),
        alignItems: 'center',
        justifyContent:"center",
        position: "absolute",
        bottom: RPP(10),
        right: RPP(20),
        shadowOffset:{ width:0, height:2 }, shadowOpacity:0.25, shadowRadius:5,
    },
})

export default styles
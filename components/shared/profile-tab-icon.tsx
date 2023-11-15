import { View } from "../Themed";
import { Image } from "expo-image";
import { RPP } from "../../utils";
import info from "../../assets/data/portfolio.json"

function ProfileTabIcon({focused, color, size}: any){
    return (
        <View style={{width: size + RPP(5), height: size + RPP(5), backgroundColor:focused ? color: "gray" , borderRadius: size+RPP(5)/2, alignItems:"center", justifyContent:"center"}}>
             <Image
                source={{uri: info.user.profilePicture}}
                style={{width: size, height: size, borderRadius: size/2}}
            />
        </View>
    )
}

export {
    ProfileTabIcon
}
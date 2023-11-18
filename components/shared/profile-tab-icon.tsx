import { View } from "../Themed";
import { Image } from "expo-image";
import { RPP } from "../../utils";
import { auth } from "../../config/firebase";

function ProfileTabIcon({focused, color, size}: any){
    const user = auth.currentUser
    const defaultAvatar = "https://res.cloudinary.com/dwjaqaekv/image/upload/v1700170556/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582_bnx4ef.jpg"
    return (
        <View style={{width: size + RPP(5), height: size + RPP(5), backgroundColor:focused ? color: "gray" , borderRadius: size+RPP(5)/2, alignItems:"center", justifyContent:"center"}}>
             <Image
              source={{uri : user?.photoURL ? user.photoURL : defaultAvatar}}
              style={{width: size, height: size, borderRadius: size/2}}
            />
        </View>
    )
}

export {
    ProfileTabIcon
}
import { View } from "../Themed";
import { Image } from "expo-image";
import { RPP } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Default from "../../constants/Default";
import useUserDetails from "../../hooks/useUserDetails";

function ProfileTabIcon({focused, color, size}: any){
    
    const { userDetails, isUserDetailsLoading, isUserDetailsError } = useUserDetails()

    return (
        <View style={{width: size + RPP(5), height: size + RPP(5), backgroundColor:focused ? color: "gray" , borderRadius: size+RPP(5)/2, alignItems:"center", justifyContent:"center"}}>
             <Image
              source={{uri : userDetails.displayPicture ? userDetails.displayPicture : Default.avatar}}
              style={{width: size, height: size, borderRadius: size/2}}
            />
        </View>
    )
}

export {
    ProfileTabIcon
}
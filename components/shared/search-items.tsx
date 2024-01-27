import { Pressable } from "react-native";
import { View, Text, useThemeColorDefault } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../stylesheet/shared/search-items";
import { Image } from "expo-image";


const SearchItem = ({onPress, data}: any) => {
    return (
      <Pressable onPress={onPress}>
        <View style={styles.innerContainer}>
                  
            <View style={styles.iconContainer2}>
                <Image 
                 source={{uri: data.avatar}}
                 style={styles.avatar}
                />
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <Text>{data.name}</Text>
                    <Text style={{color:"darkgrey", fontFamily:"Satoshi_Bold"}}>{data.username}</Text>
                </View>
            </View>
            </View>
      </Pressable>
    )
}

export default SearchItem
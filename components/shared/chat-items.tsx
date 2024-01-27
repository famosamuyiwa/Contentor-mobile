import { Pressable, TouchableOpacity } from "react-native";
import { View, Text, useThemeColorDefault } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../stylesheet/shared/chat-items";
import { Image } from "expo-image";


const ChatItem = ({onPress, data}: any) => {

    const {textColor} = useThemeColorDefault()


    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.innerContainer}>
                  
            <View style={styles.iconContainer2}>
                <Image 
                 source={{uri: data.avatar}}
                 style={styles.avatar}
                />
            </View>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={{ fontFamily: data.isRead ? "Satoshi_Regular" : "Satoshi_Bold"  }}>{data.name} • {data.time}</Text>
                    <Text style={{ fontFamily: data.isRead ? "Satoshi_Regular" : "Satoshi_Bold", color: data.isRead ? "grey" : textColor  }}>{data.lastText}</Text>
                </View>
            </View>
            </View>
      </TouchableOpacity>
    )
}

export default ChatItem
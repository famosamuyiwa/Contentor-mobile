import { View, Text } from "../Themed";
import { Image } from "expo-image";
import { styles } from "../stylesheet/shared/portfolioItems";
import { RPP } from "../../utils";
import { ResizeMode, Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

function GridItem({uri, style, type}: any){
    return (
        <View style={[styles.imageWrapper, {...style}]}>
            {(type === "image") &&
             <Image
                source={{uri}}
                style={styles.image}
            />
            }
            {(type === "video") &&
                <Video 
                    source= {{uri}}
                    style={styles.video}
                    videoStyle={{}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={false}
                    isLooping={false}
                    resizeMode={ResizeMode.COVER}
                    // useNativeControls
                />
            }
            {(type === "video") &&
                <Ionicons name="play" style={styles.playBtn}/>
            }
        </View>
    )
}

function ListItem({title, uri, style}: any){
    return (
        <View style={[styles.folderContainer, {...style}]}>
            <View style={styles.imageWrapper2}>
             <Image
                source={{uri}}
                style={styles.image}
            />
            </View>
            <View style={styles.textWrapper}>
                <Text style={{fontFamily:"Satoshi_Medium", marginLeft:RPP(20)}}>{title}</Text>
            </View>
        </View>
    )
}

export {
    GridItem,
    ListItem
}
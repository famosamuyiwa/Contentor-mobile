import { View, Text } from "../Themed";
import { Image } from "expo-image";
import { styles } from "../stylesheet/shared/portfolioItems";
import { RPP } from "../../utils";

function GridItem({uri, style}: any){
    return (
        <View style={[styles.imageWrapper, {...style}]}>
             <Image
                source={{uri}}
                style={styles.image}
            />
        </View>
    )
}

function FolderItem({title, uri, style}: any){
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
    FolderItem
}
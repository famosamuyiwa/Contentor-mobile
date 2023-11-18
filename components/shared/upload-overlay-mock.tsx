import { View, Text, useThemeColorDefault } from "../Themed";
import { StyleSheet, useColorScheme, Image, TouchableOpacity } from "react-native";
import { styles } from "../stylesheet/shared/upload-overlay";
import { VibrancyView, BlurView } from "@react-native-community/blur"
import ProgressBar from "./progress-bar";
import { Video } from 'expo-av'
import { RPP } from "../../utils";

function UploadOverlay({image, video, progress}: any){

    const theme = useColorScheme() ?? 'light';
    const {tintColor} = useThemeColorDefault()

    return (
        <View style={[StyleSheet.absoluteFill, styles.containerMock]}>
                {image && (
                    <Image 
                        source= {{uri: image}}
                        style={{
                            width: RPP(100),
                            height: RPP(100),
                            resizeMode: "contain",
                            borderRadius: RPP(6)
                        }}
                    />
                )}
                {video && (
                    <Video 
                        source= {{uri: video}}
                        style={{
                            width: RPP(200),
                            height: RPP(200)
                        }}
                        videoStyle={{}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        //shouldPlay
                        //isLooping
                        // useNativeControls
                    />
                )}
                <Text style={{fontSize: RPP(12)}}>Uploading...</Text>
                <ProgressBar progress={progress}/>
                <View style={{
                    height:1,
                    borderWidth: StyleSheet.hairlineWidth,
                    width: "60%",
                    borderColor: "#00000020"                }}/>
                <TouchableOpacity>
                    <Text style={{fontFamily:"Satoshi_Bold", color:tintColor}} >Cancel</Text>
                </TouchableOpacity>
        </View>
    )
}
 
export default UploadOverlay
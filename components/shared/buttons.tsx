import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { RPP } from "../../utils";
import { View, Text, Button } from "../Themed";
import { styles } from "../stylesheet/shared/buttons";
import { MaterialIndicator } from 'react-native-indicators';

const TextWithIcon = ({text, icon} :any) => {
    return (
        <View style={[styles.container, {borderColor: "lightgrey"}]}>
            <View style={styles.container2}>
                <View style={styles.item}>
                    {icon}
                </View>
                <Text style={{fontFamily:"Satoshi_Bold"}}>{text}</Text>
            </View>
        </View>
    )
}

const RegularButton = ({content, isLoading, onPress}: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Button style={[styles.container, {borderWidth: 0}]}>
                {
                    isLoading ? 
                    <MaterialIndicator
                        color={Colors.light.buttonText}
                        size={RPP(20)}
                    /> : 
                    content 
                }
            </Button>
        </TouchableOpacity> 
    )
}

export {
    TextWithIcon,
    RegularButton
}
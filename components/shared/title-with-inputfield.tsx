import { View, Text, TextInput } from "../Themed";
import { Image } from "expo-image";
import { styles } from "../stylesheet/shared/title-with-inputfield";
import { RPP } from "../../utils";


function TitleWithInputField({title, inputStyle, placeholder, onValueChange, value, isEditable}: any){
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={[styles.inputWrapper, {...inputStyle}]}>
                <TextInput 
                      style={[styles.textInput]}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder={placeholder}
                      value={value}
                      editable={isEditable}
                      onChangeText= {function(newValue:any){ onValueChange(newValue) }}
                    />
            </View>
        </View>
    )
}


export {
    TitleWithInputField
}
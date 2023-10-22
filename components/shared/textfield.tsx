import React, { forwardRef, useState } from 'react'
import styles from '../stylesheet/shared/textfield'
import { View, Text, TextInput as TextInputDefault , useThemeColorDefault } from '../Themed'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, TextInput } from 'react-native'


const TextField = ({label, isLabelVisible, placeholder, value, onValueChange, isPassword, isPasswordHidden, onPasswordToggle}: any) => {
    
    const {iconColor:color} = useThemeColorDefault()

    return (
        <View>
            {isLabelVisible ? <Text style={styles.label}>{label}</Text> : null}
            <View>
                <TextInputDefault 
                    style={[styles.textInput]}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={value}
                    onChangeText= {(newValue:any) => onValueChange(newValue)}
                    secureTextEntry={isPasswordHidden}
                    
                />
                <Pressable onPress={onPasswordToggle} style={styles.passwordVisibilityIcon}>
                    <View style={{display: `${isPassword? 'flex' : 'none'}`}}>
                        <Ionicons name="eye-outline"  style={[styles.passwordIcon, {display: `${isPasswordHidden? 'none' : 'flex'}`, color}]}/>
                        <Ionicons name="eye-off-outline"  style={[styles.passwordIcon, {display: `${isPasswordHidden? 'flex' : 'none'}`, color}]}/>
                    </View>
                </Pressable>
            </View>
        </View>
    )

}
 
const OTPField = forwardRef<TextInput | null, any>(({label, isLabelVisible, placeholder, value, onValueChange, onKeyPress, }: any, ref) => {
    
    const {textColor, borderColor:borderColorUnfocused, borderColorFocused} = useThemeColorDefault()

    const [borderColor, setBorderColor] = useState(borderColorUnfocused)

    return (
        <View>
            {isLabelVisible ? <Text style={styles.label}>{label}</Text> : null}
            <View>
                <TextInput
                    ref={ref}
                    style={[styles.textInput, {textAlign:'center', color:textColor, borderColor}]}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={value}
                    onChangeText= {(newValue:any) => onValueChange(newValue)}
                    maxLength={1}
                    keyboardType="numeric" // Set the keyboard type to numeric
                    textContentType="oneTimeCode" // Set the text input mode (iOS)
                    onFocus={() => {setBorderColor(borderColorFocused)}}
                    onBlur={() => {setBorderColor(borderColorUnfocused)}}
                    onKeyPress={onKeyPress}
                />
            </View>
        </View>
    )

})




export {
    TextField,
    OTPField
}
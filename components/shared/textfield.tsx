import React from 'react'
import styles from '../stylesheet/shared/textfield'
import { View, Text, TextInput, useThemeColorDefault } from '../Themed'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'


const TextField = ({label, isLabelVisible, placeholder, value, onValueChange, isPassword, isPasswordHidden, onPasswordToggle}: any) => {
    
    const {iconColor:color} = useThemeColorDefault()

    return (
        <View>
            {isLabelVisible ? <Text style={styles.label}>{label}</Text> : null}
            <View>
                <TextInput 
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


export default TextField
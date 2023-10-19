import React, { useState } from 'react'
import styles from '../stylesheet/shared/textfield'
import { View, Text, TextInput } from '../Themed'

const TextField = ({label, isLabelVisible, placeholder, value, onValueChange, isPassword}: any) => {
    
    return (
        <View >
            {isLabelVisible ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput 
                style={[styles.textInput]}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={placeholder}
                value={value}
                onChangeText= {(newValue:any) => onValueChange(newValue)}
                secureTextEntry={isPassword}
            />
        </View>
    )

}


export default TextField
import { View, Text } from "../components/Themed";
import { RegularButton, TextWithIcon } from "../components/shared/buttons";
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import styles from "./stylesheet";
import templateStyles from "./stylesheet/template";
import TextField from "../components/shared/textfield";
import Colors from "../constants/Colors";
import { RPP } from "../utils";
import { useState } from "react";
import { KeyboardAvoidingView, Image, Pressable } from "react-native";
import { useThemeColorDefault } from "../components/Themed";

export default function AuthScreen() {
    //get theme scheme to use default colors
    const {textColor:color, tintColor:tint, backgroundColor:bgColor, borderColor} = useThemeColorDefault()
    const screens = {
        login: "LOGIN",
        login2: "LOGIN2",
        signup: "SIGNUP",
        signup2: "SIGNUP2"
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentScreen, setCurrentScreen] = useState(screens.login)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)


    const onButtonClick = () => {
        
        setIsLoading(true)

        //simulate async function
        setTimeout(() => {
            setIsLoading(false)
            if(true){
                setCurrentScreen(screens.login2)
            }
        }, 3000)    

    }

    return (
        <View style={templateStyles.wrapper}>
            <View style={[styles.container, {display: `${currentScreen === screens.login ? "flex" : "none"}`, justifyContent: 'flex-end'}]}>
                <View style={styles.container2}>
                    <View>
                        <View style={[templateStyles.buttonSize]}>
                            <TextWithIcon 
                                icon={<FontAwesome5 style={[styles.icon, {color}]} name='apple'></FontAwesome5>}
                                text="Continue with Apple"
                            />
                        </View>
                        <View style={[templateStyles.buttonSize]}>
                            <TextWithIcon 
                                icon={<Image
                                    source={require('../assets/images/google.png')}
                                    fadeDuration={0}
                                    style={{ width: RPP(20), height: RPP(20) }}
                                />}
                                text="Continue with Google"
                            />
                        </View>
                        <View style={[templateStyles.buttonSize]}>
                            <TextWithIcon 
                                icon={<Text style={[styles.icon, {color}]}>𝕏</Text>}
                                text="Continue with Twitter"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <Text style={[styles.separatorText, {backgroundColor: bgColor}]}>OR</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={20}
                    style={{width:"100%"}}
                >
                    <View style={styles.container2}>
                        <TextField 
                            label='Email / Username'
                            isLabelVisible={true}
                            placeholder='Email address or Username'
                            value={email}
                            onValueChange= {(newValue: any) => setEmail(newValue)}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.container2}>
                    <View>
                        <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Continue</Text>}
                                isLoading={isLoading}
                                onPress={() => {onButtonClick()}}
                            />
                        </View>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(13)}}>By logging in, you agree to our 
                            <Text style={{color:tint, fontSize: RPP(13)}}> Privacy policy</Text> and     
                            <Text style={{color:tint, fontSize: RPP(13)}}>   Terms of Service</Text>
                        </Text>
                    </View>
                    <View style={{marginTop:RPP(30), marginBottom: RPP(20)}}>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account? 
                            <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Sign up</Text>
                        </Text>             
                    </View>
                </View>
            </View>


            <View style={[styles.container, {display: `${currentScreen === screens.login2 ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={() => {setCurrentScreen(screens.login)}}
                    >
                        <View style={[styles.backBtnBorder, {borderColor}]}>
                            <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.heading}>Sign in to Contentor</Text>
                    <Text style={styles.subheading}>Enter your details</Text>
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Email / Username'
                            isLabelVisible={true}
                            placeholder='Email address or Username'
                            value={email}
                            onValueChange= {(newValue: any) => setEmail(newValue)}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TextField 
                            label='Password'
                            isLabelVisible={true}
                            placeholder='Email address or Username'
                            value={password}
                            onValueChange= {(newValue: any) => setPassword(newValue)}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={() => {
                                setIsPasswordHidden(!isPasswordHidden)
                            }}
                        />
                    </View>
                    <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Forgot password?</Text>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign in</Text>}
                                isLoading={isLoading}
                                onPress={() => {onButtonClick()}}
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account? 
                        <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Sign up</Text>
                    </Text>             
                </View>
            </View>


        </View>
    )
}
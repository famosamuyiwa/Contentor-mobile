import { View, Text } from "../components/Themed";
import { RegularButton, TextWithIcon } from "../components/shared/buttons";
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import styles from "./stylesheet";
import templateStyles from "./stylesheet/template";
import {TextField} from "../components/shared/textfield";
import Colors from "../constants/Colors";
import { RPP } from "../utils";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Image, Pressable, TouchableOpacity, Platform } from "react-native";
import { useThemeColorDefault } from "../components/Themed";
import OTPVerification from "../components/shared/otp-verification";
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser'
import { SuccessModal } from "../components/shared/modals";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession()

export default function AuthScreen() {

    const router = useRouter()

    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "1068157340831-m7ipd80pcfqr7usoh6ad3kfei4jrdobb.apps.googleusercontent.com",
        iosClientId: "1068157340831-j2vfidg72d9t42blc6orvfvhh751jm56.apps.googleusercontent.com",
        webClientId: "1068157340831-h46a15ouplrt6tp3sltht5mptpr846q2.apps.googleusercontent.com",
    })

    useEffect(() => {
        handleSignInWithGoogle()
    }, [response])

    async function handleSignInWithGoogle(){
        const user = await AsyncStorage.getItem("@user")
        if(!user){
            if(response?.type === "success"){
                await getUserInfo(response.authentication?.accessToken)
            }
        }else{
            setUserInfo(JSON.parse(user))
        }
    }

    async function getUserInfo(token:any){
        if(!token) return
        try{
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            const user = await response.json()
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
        }catch(error){

        }
    }

    //get theme scheme to use default colors
    const {textColor:color, tintColor:tint, backgroundColor:bgColor, borderColor} = useThemeColorDefault()
    const screens = {
        login: "LOGIN",
        login2: "LOGIN2",
        signup: "SIGNUP",
        signup2: "SIGNUP2",
        otp: "OTP",
        forgotPassword: "FORGOT_PASSWORD",
        resetPassword: "RESET_PASSWORD"
    }

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentScreen, setCurrentScreen] = useState(screens.login)
    const [previousScreen, setPreviousScreen] = useState(screens.login)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
    const [isModal, setIsModal] = useState(false)


    // reset input fields on auth page switch
    useEffect(function(){
        if(currentScreen === screens.login || currentScreen === screens.signup || currentScreen === screens.forgotPassword || currentScreen === screens.resetPassword){
            setEmail("")
            setName("")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setIsLoading(false)
            setIsPasswordHidden(true)
            setIsConfirmPasswordHidden(true)
        }
    }, [currentScreen])


    //function to run when button is clicked
    function onButtonClick(){

        setIsLoading(true)

        //simulate async function
        setTimeout(() => {
            setIsLoading(false)
            if(true){
                switch(currentScreen){
                    case screens.login:
                        setCurrentScreen(screens.login2)
                        break
                    case screens.login2:
                        router.replace('/profile')
                        break
                    case screens.signup:
                        setCurrentScreen(screens.otp)
                        setPreviousScreen(screens.signup)
                        break
                    case screens.signup2:
                        setCurrentScreen(screens.signup2)
                        break
                    case screens.otp:
                        previousScreen === screens.signup ? setCurrentScreen(screens.signup2) : setCurrentScreen(screens.resetPassword)
                        break
                    case screens.forgotPassword:
                        setCurrentScreen(screens.otp)
                        setPreviousScreen(screens.login2)
                        break
                    case screens.forgotPassword:
                        setCurrentScreen(screens.otp)
                        setPreviousScreen(screens.login2)
                        break
                    case screens.resetPassword:
                        password === confirmPassword ? setIsModal(true) : 0
                        break
                    default:
                        return
                }
            }
        }, 3000)    

    }

    return (
        
        <View style={templateStyles.wrapper}>

{/*------------------LOGIN PAGE BEFORE EMAIL VERIFICATION-------------------------*/}

            <View style={[styles.container, {display: `${currentScreen === screens.login ? "flex" : "none"}`, justifyContent: 'flex-end'}]}>
                <View style={styles.container2}>
                    <View>
                        <TouchableOpacity>
                            <View style={[templateStyles.buttonSize]}>
                                <TextWithIcon 
                                    icon={<FontAwesome5 style={[styles.icon, {color}]} name='apple'></FontAwesome5>}
                                    text="Continue with Apple"
                            />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={function(){ promptAsync() }}>
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
                        </TouchableOpacity>
                        {/* <Text>{JSON.stringify(userInfo, null, 2)}</Text> */}
                    </View>
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <Text style={[styles.separatorText, {backgroundColor: bgColor}]}>OR</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={RPP(20)}
                    style={{width:"100%"}}
                >
                    <View style={styles.container2}>
                        <TextField 
                            label='Email / Username'
                            isLabelVisible={true}
                            placeholder='Email address or Username'
                            value={email}
                            onValueChange= {function(newValue: any){ setEmail(newValue) }}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.container2}>
                    <View>
                        <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Continue</Text>}
                                isLoading={isLoading}
                                onPress={function(){ onButtonClick() }}
                                isActive={email != ""}
                            />
                        </View>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(13)}}>By logging in, you agree to our 
                            <Text style={{color:tint, fontSize: RPP(13)}}> Privacy policy</Text> and     
                            <Text style={{color:tint, fontSize: RPP(13)}}>   Terms of Service</Text>
                        </Text>
                    </View>
                    <View style={{marginTop:RPP(30), marginBottom: RPP(20), flexDirection:"row"}}>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>     
                        <TouchableOpacity onPress={function(){ (setCurrentScreen(screens.signup)) }}>
                                <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Sign up</Text>
                        </TouchableOpacity>        
                    </View>
                </View>
            </View>

{/*------------------LOGIN PAGE AFTER EMAIL VERIFICATION-------------------------*/}

            <View style={[styles.container, {display: `${currentScreen === screens.login2 ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={function(){ setCurrentScreen(screens.login) }}
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
                            onValueChange= {function(newValue: any){ setEmail(newValue) }}
                        />
                    </View>
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Password'
                            isLabelVisible={true}
                            placeholder='Email address or Username'
                            value={password}
                            onValueChange= {function(newValue: any){ setPassword(newValue) }}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={function(){
                                setIsPasswordHidden(!isPasswordHidden)
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={function(){ setCurrentScreen(screens.forgotPassword) }}>
                        <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign in</Text>}
                                isLoading={isLoading}
                                onPress={function(){ onButtonClick() }}
                                isActive={email != "" && password != ""}
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>   
                    <TouchableOpacity onPress={function(){ (setCurrentScreen(screens.signup)) }}>
                            <Text style={{lineHeight:RPP(20), color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Sign up</Text>
                    </TouchableOpacity>          
                </View>
            </View>

{/*------------------SIGNUP PAGE BEFORE EMAIL VERIFICATION-------------------------*/}
            
            <View style={[styles.container, {display: `${currentScreen === screens.signup ? "flex" : "none"}`, justifyContent: 'flex-end'}]}>
                <View style={styles.container2}>
                    <View>
                        <TouchableOpacity>
                            <View style={[templateStyles.buttonSize]}>
                                <TextWithIcon 
                                    icon={<FontAwesome5 style={[styles.icon, {color}]} name='apple'></FontAwesome5>}
                                    text="Continue with Apple"
                            />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                        </TouchableOpacity>
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
                            label='Name'
                            isLabelVisible={true}
                            placeholder='Enter your name'
                            value={name}
                            onValueChange= {function(newValue: any){ setName(newValue) }}
                        />
                    </View>
                    <View style={[styles.container2, {marginTop:RPP(10)}]}>
                        <TextField 
                            label='Email'
                            isLabelVisible={true}
                            placeholder='Enter your email address'
                            value={email}
                            onValueChange= {function(newValue: any){ setEmail(newValue) }}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.container2}>
                    <View>
                        <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Continue</Text>}
                                isLoading={isLoading}
                                onPress={function(){ onButtonClick() }}
                                isActive={name != "" && email != ""}
                            />
                        </View>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(13)}}>By signing up, you agree to our 
                            <Text style={{color:tint, fontSize: RPP(13)}}> Privacy policy</Text> and     
                            <Text style={{color:tint, fontSize: RPP(13)}}>   Terms of Service</Text>
                        </Text>
                    </View>
                    <View style={{marginTop:RPP(30), marginBottom: RPP(20), flexDirection:"row"}}>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>             
                        <TouchableOpacity onPress={function(){ (setCurrentScreen(screens.login)) }}>
                                <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

{/*------------------VERIFY EMAIL OTP PAGE-------------------------*/}
           
            <View style={{display: `${currentScreen === screens.otp ? "flex" : "none"}`}}>
                <OTPVerification 
                    email={email}
                    onBackBtn={function(){ (setCurrentScreen(previousScreen)) }}
                    onVerifyBtn={function(){ onButtonClick() }}
                    isLoading={isLoading}
                    isCurrentScreen={currentScreen === screens.otp}
                />
            </View>

{/*------------------SIGNUP PAGE AFTER EMAIL VERIFICATION-------------------------*/}
            
            <View style={[styles.container, {display: `${currentScreen === screens.signup2 ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={function(){ setCurrentScreen(screens.signup) }}
                    >
                        <View style={[styles.backBtnBorder, {borderColor}]}>
                            <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.heading}>Create Password</Text>
                    <Text style={styles.subheading}>Create a username and password</Text>
                    <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={20}
                    style={{width:"100%"}}
                     >
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Username'
                            isLabelVisible={true}
                            placeholder='Enter a username'
                            value={username}
                            onValueChange= {function(newValue: any){ setUsername(newValue) }}
                        />
                    </View>
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Password'
                            isLabelVisible={true}
                            placeholder='Enter password'
                            value={password}
                            onValueChange= {function(newValue: any){ setPassword(newValue) }}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={function(){
                                setIsPasswordHidden(!isPasswordHidden)
                            }}
                        />
                    </View>
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Confirm Password'
                            isLabelVisible={true}
                            placeholder='Enter password again'
                            value={confirmPassword}
                            onValueChange= {function(newValue: any){ setConfirmPassword(newValue) }}
                            isPassword={true}
                            isPasswordHidden={isConfirmPasswordHidden}
                            onPasswordToggle={function(){
                                setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                            }}
                        />
                    </View>
                    </KeyboardAvoidingView>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign up</Text>}
                                isLoading={isLoading}
                                onPress={function(){ onButtonClick() }}
                                isActive={username != "" && password != "" && confirmPassword != ""}
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Have an account already? </Text>  
                    <TouchableOpacity onPress={function(){ setCurrentScreen(screens.login) } }>
                            <Text style={{lineHeight:RPP(20), color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Log in</Text>
                    </TouchableOpacity>           
                </View>
            </View>

{/*--------------------------FORGOT PASSWORD-------------------------------*/}

            <View style={[styles.container, {display: `${currentScreen === screens.forgotPassword ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                            onPress={function(){ setCurrentScreen(screens.login2) }}
                        >
                        <View style={[styles.backBtnBorder, {borderColor}]}>
                            <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <View>
                        <Text style={styles.heading}>Forgot Password?</Text>
                        <Text style={{color:"darkgrey", marginTop:RPP(10)}}>Don't worry! It happens. Please enter the email associated with this account</Text>
                    </View>
                    <View style={{marginVertical: RPP(30)}}>
                        <TextField 
                                label='Email'
                                isLabelVisible={true}
                                placeholder='Enter your email address'
                                value={email}
                                onValueChange= {function(newValue: any){ setEmail(newValue) }}
                            />
                    </View>
                </View>
                <View style={styles.container2}>
                    <View style={templateStyles.buttonSize}>
                        <RegularButton 
                            content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Verify</Text>}
                            onPress={function(){ onButtonClick() }}
                            isLoading={isLoading}
                            isActive={email != ""}
                        />
                    </View>
                </View>
            </View>

{/*--------------------------RESET PASSWORD-------------------------------*/}
 
            <View style={[styles.container, {display: `${currentScreen === screens.resetPassword ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={function(){ setCurrentScreen(screens.signup) }}
                    >
                        <View style={[styles.backBtnBorder, {borderColor}]}>
                            <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.heading}>Reset Password</Text>
                    <Text style={styles.subheading}>Your new password should be different from your previous password.</Text>
                    <View style={{marginBottom: 10}}>
                        <TextField 
                            label='Password'
                            isLabelVisible={true}
                            placeholder='Enter password'
                            value={password}
                            onValueChange= {function(newValue: any){ setPassword(newValue) }}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={function(){
                                setIsPasswordHidden(!isPasswordHidden)
                            }}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TextField 
                            label='Confirm Password'
                            isLabelVisible={true}
                            placeholder='Enter password again'
                            value={confirmPassword}
                            onValueChange= {function(newValue: any){ setConfirmPassword(newValue) }}
                            isPassword={true}
                            isPasswordHidden={isConfirmPasswordHidden}
                            onPasswordToggle={function(){
                                setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                            }}
                        />
                    </View>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Continue</Text>}
                                isLoading={isLoading}
                                onPress={function(){ {onButtonClick()} }}
                                isActive={ password != "" && confirmPassword != ""}
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Have an account already? </Text>  
                    <TouchableOpacity onPress={function(){ setCurrentScreen(screens.login) }}>
                            <Text style={{lineHeight:RPP(20), color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Log in</Text>
                    </TouchableOpacity>           
                </View>
            </View>
            <View>
                <SuccessModal 
                    isVisible={isModal}
                    header="Password changed"
                    subHeader="Your password has been changed successfully"
                    buttonText={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Back to log in</Text>}
                    onButtonPress={function(){
                        setIsModal(false)
                        setCurrentScreen(screens.login)
                    }}
                />
            </View>

{/*--------------------------------------------------------------*/}

        </View>
    )
}
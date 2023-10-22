import { View, Text } from "../components/Themed";
import { RegularButton, TextWithIcon } from "../components/shared/buttons";
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import styles from "./stylesheet";
import templateStyles from "./stylesheet/template";
import {TextField} from "../components/shared/textfield";
import Colors from "../constants/Colors";
import { RPP } from "../utils";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Image, Pressable, TouchableOpacity } from "react-native";
import { useThemeColorDefault } from "../components/Themed";
import OTPVerification from "../components/shared/otp-verification";

export default function AuthScreen() {
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

    const [email, setEmail] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [confirmPassword, setConfirmPassword] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [currentScreen, setCurrentScreen] = useState(screens.login)
    const [previousScreen, setPreviousScreen] = useState(screens.login)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)

    // reset input fields on auth page switch
    useEffect(() => {
        if(currentScreen === screens.login || currentScreen === screens.signup || currentScreen === screens.forgotPassword || currentScreen === screens.resetPassword){
            setEmail(undefined)
            setName(undefined)
            setUsername(undefined)
            setPassword(undefined)
            setConfirmPassword(undefined)
            setIsLoading(false)
            setIsPasswordHidden(true)
            setIsConfirmPasswordHidden(true)
        }
    }, [currentScreen])


    //function to run when button is clicked
    const onButtonClick = () => {
        
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
                        setCurrentScreen(screens.login2)
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
                                isActive={email}
                            />
                        </View>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(13)}}>By logging in, you agree to our 
                            <Text style={{color:tint, fontSize: RPP(13)}}> Privacy policy</Text> and     
                            <Text style={{color:tint, fontSize: RPP(13)}}>   Terms of Service</Text>
                        </Text>
                    </View>
                    <View style={{marginTop:RPP(30), marginBottom: RPP(20), flexDirection:"row"}}>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>     
                        <TouchableOpacity onPress={() => (setCurrentScreen(screens.signup))}>
                                <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Sign up</Text>
                        </TouchableOpacity>        
                    </View>
                </View>
            </View>

{/*------------------LOGIN PAGE AFTER EMAIL VERIFICATION-------------------------*/}

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
                    <TouchableOpacity onPress={() => {setCurrentScreen(screens.forgotPassword)}}>
                        <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign in</Text>}
                                isLoading={isLoading}
                                onPress={() => {onButtonClick()}}
                                isActive={email && password}
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>   
                    <TouchableOpacity onPress={() => (setCurrentScreen(screens.signup))}>
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
                            onValueChange= {(newValue: any) => setName(newValue)}
                        />
                    </View>
                    <View style={[styles.container2, {marginTop:RPP(10)}]}>
                        <TextField 
                            label='Email'
                            isLabelVisible={true}
                            placeholder='Enter your email address'
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
                                isActive={name && email}
                            />
                        </View>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(13)}}>By signing up, you agree to our 
                            <Text style={{color:tint, fontSize: RPP(13)}}> Privacy policy</Text> and     
                            <Text style={{color:tint, fontSize: RPP(13)}}>   Terms of Service</Text>
                        </Text>
                    </View>
                    <View style={{marginTop:RPP(30), marginBottom: RPP(20), flexDirection:"row"}}>
                        <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Don't have an account?</Text>             
                        <TouchableOpacity onPress={() => (setCurrentScreen(screens.login))}>
                                <Text style={{color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}> Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

{/*------------------VERIFY EMAIL OTP PAGE-------------------------*/}
           
            <View style={{display: `${currentScreen === screens.otp ? "flex" : "none"}`}}>
                <OTPVerification 
                    email={email}
                    onBackBtn={() => (setCurrentScreen(previousScreen))}
                    onVerifyBtn={() => {onButtonClick()}}
                    isLoading={isLoading}
                    isCurrentScreen={currentScreen === screens.otp}
                />
            </View>

{/*------------------SIGNUP PAGE AFTER EMAIL VERIFICATION-------------------------*/}
            
            <View style={[styles.container, {display: `${currentScreen === screens.signup2 ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={() => {setCurrentScreen(screens.signup)}}
                    >
                        <View style={[styles.backBtnBorder, {borderColor}]}>
                            <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.heading}>Create Password</Text>
                    <Text style={styles.subheading}>Create a username and password</Text>
                    <View style={{marginBottom: RPP(10)}}>
                        <TextField 
                            label='Username'
                            isLabelVisible={true}
                            placeholder='Enter a username'
                            value={username}
                            onValueChange= {(newValue: any) => setUsername(newValue)}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TextField 
                            label='Password'
                            isLabelVisible={true}
                            placeholder='Enter password'
                            value={password}
                            onValueChange= {(newValue: any) => setPassword(newValue)}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={() => {
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
                            onValueChange= {(newValue: any) => setConfirmPassword(newValue)}
                            isPassword={true}
                            isPasswordHidden={isConfirmPasswordHidden}
                            onPasswordToggle={() => {
                                setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                            }}
                        />
                    </View>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign up</Text>}
                                isLoading={isLoading}
                                onPress={() => {onButtonClick()}}
                                isActive={username && password && confirmPassword }
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Have an account already? </Text>  
                    <TouchableOpacity onPress={() => (setCurrentScreen(screens.login))}>
                            <Text style={{lineHeight:RPP(20), color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Log in</Text>
                    </TouchableOpacity>           
                </View>
            </View>

{/*--------------------------FORGOT PASSWORD-------------------------------*/}

            <View style={[styles.container, {display: `${currentScreen === screens.forgotPassword ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                            onPress={() => {setCurrentScreen(screens.login2)}}
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
                                onValueChange= {(newValue: any) => setEmail(newValue)}
                            />
                    </View>
                </View>
                <View style={styles.container2}>
                    <View style={templateStyles.buttonSize}>
                        <RegularButton 
                            content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Verify</Text>}
                            onPress={() => (onButtonClick())}
                            isLoading={isLoading}
                            isActive={email}
                        />
                    </View>
                </View>
            </View>

{/*--------------------------RESET PASSWORD-------------------------------*/}
 
            <View style={[styles.container, {display: `${currentScreen === screens.resetPassword ? "flex" : "none"}`}]}>
                <View style={[styles.container3, {justifyContent:"flex-start", flexDirection:"row"}]}>
                    <Pressable
                        onPress={() => {setCurrentScreen(screens.signup)}}
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
                            onValueChange= {(newValue: any) => setPassword(newValue)}
                            isPassword={true}
                            isPasswordHidden={isPasswordHidden}
                            onPasswordToggle={() => {
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
                            onValueChange= {(newValue: any) => setConfirmPassword(newValue)}
                            isPassword={true}
                            isPasswordHidden={isConfirmPasswordHidden}
                            onPasswordToggle={() => {
                                setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                            }}
                        />
                    </View>
                </View>
                <View  style={[templateStyles.buttonSize, {marginVertical: RPP(30)}]}>
                            <RegularButton
                                content={<Text lightColor={Colors.light.buttonText} darkColor={Colors.light.buttonText}>Sign up</Text>}
                                isLoading={isLoading}
                                onPress={() => {onButtonClick()}}
                                isActive={ password && confirmPassword }
                            />
                </View>
                <View style={[styles.container2, {marginBottom: RPP(20), flex:1, flexDirection:"row", alignItems:"flex-end"} ]}>
                    <Text style={{lineHeight:RPP(20), color:"darkgrey", fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Have an account already? </Text>  
                    <TouchableOpacity onPress={() => (setCurrentScreen(screens.login))}>
                            <Text style={{lineHeight:RPP(20), color:tint, fontSize: RPP(15), fontFamily:"Satoshi_Medium"}}>Log in</Text>
                    </TouchableOpacity>           
                </View>
            </View>

{/*--------------------------------------------------------------*/}

        </View>
    )
}
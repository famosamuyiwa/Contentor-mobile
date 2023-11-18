import { View, Text, useThemeColorDefault } from '../components/Themed'
import styles from './stylesheet/editProfile'
import { Image } from "expo-image";
import { MaterialIcons } from '@expo/vector-icons'
import { RPP } from '../utils';
import { Alert, KeyboardAvoidingView, Pressable, TouchableOpacity } from 'react-native';
import { TitleWithInputField } from '../components/shared/title-with-inputfield';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {  useRouter } from 'expo-router';
import { auth, database } from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { User } from '../redux/slices/userSlice';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default function EditProfile() {
  const {tintColor} = useThemeColorDefault()
  const [image, setImage] = useState('');
  const [information, setInformation] = useState({
    username: "",
    name: "",
    bio: "",
    link: "",
    profession: ""
  })
  const router = useRouter()
  const user = auth.currentUser


  const userDetails: User = useSelector((state: RootState) => state.user.user[0]) || [];
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result:any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


const updateUserProfile = async () => {
  if (user) {
    const userRef = collection(database, 'users');
    const q = query(userRef, where("userId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(database, 'users', querySnapshot.docs[0].id);
        await updateDoc(docRef, { 
            ...information
         });
        console.log("success")
        router.back()
      } else {
        Alert.alert("Error Updating Profile");
      }
    } catch (error:any) {
      Alert.alert("Error Updating Profile", error.message);
    }
  }
};


  useEffect(() => {
    if(user){
      userDetails.displayPicture ? setImage(userDetails.displayPicture) : setImage('')
      setInformation({
        username: userDetails.username,
        name: userDetails.name, 
        bio: userDetails.bio || "",
        link: userDetails.link || "",
        profession: userDetails.profession || ""
      });

    }
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={function(){router.back()}} style={styles.headerActionContainer}>
          <Text style={styles.headerActionText}>Cancel</Text>
        </Pressable>
        <View>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>
        <Pressable onPress={() => { updateUserProfile() }} style={styles.headerActionContainer}>
          <Text style={[styles.headerActionText, {textAlign:"right", color: tintColor}]}>Save</Text>
        </Pressable>
      </View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => pickImage()} style={{display: image !== '' ? 'flex' : 'none'}}>
          <View style={styles.cameraPlusIcon}>
            <MaterialIcons name="camera-enhance" style={{color: tintColor, fontSize:RPP(25)}}/>
          </View>
          <Image
            source={{uri : image}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()} style={[styles.profileDefaultImage, {display: image !== '' ? 'none' : 'flex', backgroundColor:"darkgrey"}]}>
            <MaterialIcons name="camera-alt" style={[styles.cameraDefaultIcon]}/>
        </TouchableOpacity>
      </View>
      <View style={styles.informationContainer}>
        <TitleWithInputField 
          title="Username" 
          inputStyle={{borderBottomWidth: RPP(0.4)}}
          value={"@"+information.username}
          isEditable={false}
          onValueChange= {function(newValue: any){ setInformation({...information, username: newValue}) }}
          />
        <TitleWithInputField 
          title="Name" 
          inputStyle={{borderBottomWidth: RPP(0.4)}}
          value={information.name}
          onValueChange= {function(newValue: any){ setInformation({...information, name: newValue}) }}
          />
        <TitleWithInputField
          title="Bio" 
          inputStyle={{borderBottomWidth: RPP(0.4)}}
          value={information.bio}
          onValueChange= {function(newValue: any){ setInformation({...information, bio: newValue}) }}
          />
        <TitleWithInputField
          title="Link" 
          inputStyle={{borderBottomWidth: RPP(0.4)}}
          value={information.link}
          onValueChange= {function(newValue: any){ setInformation({...information, link: newValue}) }}
          />
        <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={RPP(40)}
              style={{width:"100%"}}
          >
        <TitleWithInputField
          title="Profession" 
          inputStyle={{marginBottom: RPP(10)}}
          value={information.profession}
          onValueChange= {function(newValue: any){ setInformation({...information, profession: newValue}) }}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}
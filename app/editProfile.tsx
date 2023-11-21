import { View, Text, useThemeColorDefault } from '../components/Themed'
import styles from './stylesheet/editProfile'
import { Image } from "expo-image";
import { MaterialIcons } from '@expo/vector-icons'
import { RPP } from '../utils';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Pressable, TouchableOpacity } from 'react-native';
import { TitleWithInputField } from '../components/shared/title-with-inputfield';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {  useRouter } from 'expo-router';
import { auth, database, storage } from '../config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function EditProfile() {
  const {tintColor} = useThemeColorDefault()
  const [information, setInformation] = useState({
    username: "",
    name: "",
    bio: "",
    link: "",
    profession: "",
    displayPicture: ""
  })
  const [isDisplayPictureChanged, setIsDisplayPictureChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      setInformation((existingInformation) => ({...existingInformation, displayPicture: result.assets[0].uri}))
      setIsDisplayPictureChanged(true)
    }
  };

  //save display picture to bucket and get uri
  async function uploadDisplayPicture( details: { uri: string } ) {

    setIsLoading(true)

    //check to see if user dp was changed
    if(!isDisplayPictureChanged){
      return updateUserProfile("")
    }

    const response = await fetch(details.uri)
    const blob = await response.blob()

    const storageRef = ref(storage, "Stuff/" + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob)

    //listen for events
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Progress: " + progress + "% done")
      },
      (error) => {
        //handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadUrl) => {
            console.log("File available at ", downloadUrl)
            //set display picture uri
            await updateUserProfile(downloadUrl)
          })
      }
    )
  }


const updateUserProfile = async (displayPictureUrl:any) => {
    

    const userRef = collection(database, 'users');
    const q = query(userRef, where("userId", "==", user?.uid));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(database, 'users', querySnapshot.docs[0].id);
        await updateDoc(docRef, { 
            ...information,
            displayPicture: isDisplayPictureChanged? displayPictureUrl : information.displayPicture
         });
         setIsLoading(false)
         router.back()
      } else {
        setIsLoading(false)
        Alert.alert("Error Updating Profile");
      }
    } catch (error:any) {
      setIsLoading(false)
      Alert.alert("Error Updating Profile", error.message);
    }
  
};

//preload user info
  useEffect(() => {
    if(user){
      userDetails.displayPicture ? setInformation((existingInformation) => ({...existingInformation, displayPicture: userDetails.displayPicture})) : setInformation((prevInfo) => ({...prevInfo, displayPicture: userDetails.displayPicture}))
      setInformation({
        username: userDetails.username,
        name: userDetails.name, 
        bio: userDetails.bio || "",
        link: userDetails.link || "",
        profession: userDetails.profession || "",
        displayPicture: userDetails.displayPicture
      });
      setIsDisplayPictureChanged(false)

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
        {!isLoading &&
        <Pressable onPress={() => { uploadDisplayPicture({uri: information.displayPicture}) }} style={styles.headerActionContainer}>
          <Text style={[styles.headerActionText, {textAlign:"right", color: tintColor}]}>Save</Text>
        </Pressable>
        }
        {isLoading &&
          <ActivityIndicator size="small" color={tintColor}/>
        }
      </View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => pickImage()} style={{display: information.displayPicture ? 'flex' : 'none'}}>
          <View style={styles.cameraPlusIcon}>
            <MaterialIcons name="camera-enhance" style={{color: tintColor, fontSize:RPP(25)}}/>
          </View>
          <Image
            source={{uri : information.displayPicture}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()} style={[styles.profileDefaultImage, {display: information.displayPicture ? 'none' : 'flex', backgroundColor:"darkgrey"}]}>
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
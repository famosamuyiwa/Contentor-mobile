import { View, Text, useThemeColorDefault } from '../../components/Themed'
import { Pressable, ScrollView, useColorScheme, TouchableHighlight, FlatList, Alert } from "react-native";
import { Image } from "expo-image";
import { RPH, RPP } from '../../utils';
import templateStyles from '../stylesheet/tabs/template';
import styles from '../stylesheet/tabs/profile';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react';
import { ListItem, GridItem } from '../../components/shared/portfolioItems';
import { Link } from 'expo-router';
import { auth, database, storage } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/thunks/userThunk';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { useFocusEffect } from '@react-navigation/native';
import * as MediaPicker from 'expo-image-picker';
import Multimedia from '../../constants/Media';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import UploadOverlay from '../../components/shared/upload-overlay-mock';
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import Default from '../../constants/Default';
import Tabs from '../../constants/Tabs';


export default function Profile() {
  const colorScheme = useColorScheme();
  const {tintColor, iconColor} = useThemeColorDefault()
  const userId = auth.currentUser?.uid
  const dispatch: Dispatch<any> = useDispatch();
  const [currentTab, setCurrentTab] = useState(Tabs.GRID)
  const [image, setImage] = useState("")
  const [video, setVideo] = useState("")
  const [progress, setProgress] = useState(0)
  const [portfolioGridItems, setPortfolioGridItems] = useState<PortfolioItem[]>([])
  const [portfolioListItems, setPortfolioListItems] = useState<PortfolioItem[]>([])

  const userDetails: User = useSelector((state: RootState) => state.user.user[0]) || [];
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  //refetch user details on screen show
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserDetails(userId || ""));
    }, [dispatch, userId])
  );

  useEffect(() => {
    //get data back immediately it has been saved to db
    const portfolioRef = collection(database, "portfolio")
    const q = query(portfolioRef, where("userId", "==", userId), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMedia: PortfolioItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        fileType: doc.data().fileType,
        url: doc.data().url,
        createdAt: doc.data().createdAt
      }));


      setPortfolioGridItems(newMedia.filter(item => item.fileType === 'image' || item.fileType === 'video'))
      setPortfolioListItems(newMedia.filter(item => item.fileType === ''))

    })

    //unmount to avoid performance issues
    return () => unsubscribe()

  }, [])
 

  async function pickMultimedia(type:any){
      if(type===Multimedia.IMAGE_VIDEO){
           // No permissions request is necessary for launching the image library
        let result:any = await MediaPicker.launchImageLibraryAsync({
          mediaTypes: MediaPicker.MediaTypeOptions.All,
          quality: 1
        });
        if (!result.canceled) {
          result.assets[0].type === "image" ? setImage(result.assets[0].uri) : setVideo(result.assets[0].uri);
          await uploadMultimedia({
            uri: result.assets[0].uri,
            fileType: result.assets[0].type
          })
        }
      }
  };

  async function uploadMultimedia( details: any ) {
    const response = await fetch(details.uri)
    const blob = await response.blob()

    const storageRef = ref(storage, "Stuff/" + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob)

    //listen for events
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Progress: " + progress + "% done")
        setProgress(parseInt(progress.toFixed()))
      },
      (error) => {
        //handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadUrl) => {
            console.log("File available at ", downloadUrl)
            //save record
            await saveMultimediaToDB(details.fileType, downloadUrl, new Date().toISOString())
            setImage("")
            setVideo("")
          })
      }
    )
  }

  async function saveMultimediaToDB(fileType:string, url:string, createdAt:string){
    try{
        // Add media to multimedia collection
        await addDoc(collection(database, 'portfolio'), {
          userId: auth.currentUser?.uid,
          fileType,
          url,
          createdAt
        });    
    }catch(err:any){
      Alert.alert("Error saving media:", err)
    }
  }

  const pickHeader = async () => {
    // No permissions request is necessary for launching the image library
    let result:any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadHeaderPicture({uri : result.assets[0].uri})
    }
  };

    //save header picture to bucket and get uri
    async function uploadHeaderPicture( details: any ) {
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
              updateHeader(downloadUrl)
            })
        }
      )
    }

  //update header in db
  const updateHeader = async (headerPicture : string) => {

      const userRef = collection(database, 'users');
      const q = query(userRef, where("userId", "==", userId));
  
      try {
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docRef = doc(database, 'users', querySnapshot.docs[0].id);
          await updateDoc(docRef, { 
              headerPicture
           })

           //fetch details again
           dispatch(fetchUserDetails(userId || ""));
          } else {
          Alert.alert("Error Updating Profile");
        }
      } catch (error:any) {
        Alert.alert("Error Updating Profile", error.message);
      }
    
  };

  return (
    <View style={templateStyles.container}>
        <Image
          source={{uri : userDetails.headerPicture ? userDetails.headerPicture : Default.avatar}}
          style={{ width: '100%', height: RPH(60), position:'absolute'}}
        />
        <MaterialCommunityIcons name="image-edit" color="white" style={styles.headerIcon}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => {pickHeader()}} style={styles.headerView} />
        <View style={styles.container}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{uri : userDetails.displayPicture ? userDetails.displayPicture : Default.avatar}}
              style={styles.profileImage}
            />
          </View>
          <Link asChild href="/editProfile">
            <Pressable style={styles.editIconWrapper}>
              <MaterialCommunityIcons name="account-edit" style={{fontSize: RPP(25), color: iconColor}} />
            </Pressable>
          </Link>
          <View style={{paddingLeft:RPP(5)}}>
            <Text style={{fontFamily: "Satoshi_Bold", fontSize: RPP(18)}}>{userDetails.name}</Text>
            <Text style={{color:"grey"}}>{"@" + userDetails.username}</Text>
            <View style={{flexDirection:"row", marginTop:RPP(2 )}}>
              <View style={{flexDirection:"row", alignItems: "baseline", marginRight:RPP(10), display: userDetails.profession ? "flex" : "none"}}>
                <Ionicons name={colorScheme === 'dark' ? "briefcase-sharp" : "briefcase-outline"} style={{color:"grey", marginRight:RPP(5)}}/>
                <Text style={{fontSize:RPP(14), color:"grey"}}>{userDetails.profession}</Text>
              </View>
              <View style={{flexDirection:"row", alignItems: "baseline", display: userDetails.link ? "flex" : "none"}}>
                <AntDesign name="link" style={{color:"grey", marginRight:RPP(5)}}/>
                <Text style={{fontSize:RPP(14), color:tintColor}}>{userDetails.link}</Text>
              </View>
            </View>
            <View style={{marginVertical:RPP(5)}}>
              <Text>{userDetails.bio}</Text>
            </View>  
          </View>
          <View style={styles.tabFilter}>
            <Pressable onPress={function(){
              setCurrentTab(Tabs.GRID)
              }} 
              style={[styles.tab, {borderColor:  currentTab === Tabs.GRID ? tintColor : "lightgrey" , borderBottomWidth: currentTab === Tabs.GRID ? RPP(3) : 0 }]}>
                <Ionicons name="grid" style={{fontSize: RPP(20), color: `${ currentTab === Tabs.GRID ? tintColor : "lightgrey"}`}} />
            </Pressable>
            <Pressable onPress={function(){
              setCurrentTab(Tabs.LIST)
              }} 
                style={[styles.tab, {borderColor:  currentTab === Tabs.LIST ? tintColor : "lightgrey",  borderBottomWidth: currentTab === Tabs.LIST ? RPP(3) : 0 }]}>
              <Ionicons name="folder" style={{fontSize: RPP(20), color: `${ currentTab === Tabs.LIST ? tintColor : "lightgrey"}`}}/>
            </Pressable>
          </View>
          <View style={[{display: `${ currentTab === Tabs.GRID ? "flex" : "none"}`}]}>
            <FlatList
              numColumns={3} // Set the number of columns you want
              style={{marginBottom: RPP(10), display: portfolioGridItems? "flex" : "none"}}
              showsVerticalScrollIndicator={false}
              data={portfolioGridItems}
              keyExtractor={(item) => item.url}
              renderItem={({item, index}) => <GridItem 
                                                uri={item.url}
                                                style={{
                                                        marginLeft: index % 3 === 1 ? RPP(10) : 0, // Add left margin to items in the middle
                                                        marginRight: index % 3 === 1 ? RPP(10) : 0, // Add right margin to items in the middle
                                                        marginTop:  RPP(10) // Add top margin to all
                                                      }}
                                                type={item.fileType}
                                             />
                          }
              scrollEnabled={false}
            />
          </View>
          <View style={[{display: `${ currentTab === Tabs.LIST ? "flex" : "none"}`}]}>
            <FlatList
              style={{marginBottom: RPP(10), display: portfolioListItems? "flex" : "none"}}
              showsVerticalScrollIndicator={false}
              data={portfolioListItems}
              renderItem={({item, index}) => <ListItem 
                                        title={"test"}
                                        uri={"test"}
                                        style={{
                                                marginTop:  index === 0 ? RPP(10) : 0, // Add top margin to first item
                                                paddingVertical:  RPP(10) // Add vertical padding to all
                                              }}
                                       />
                          }
              scrollEnabled={false}

            />
          </View>
          <View style={{alignItems: "center", justifyContent: "center", height: "50%", display: (currentTab === Tabs.GRID && !portfolioGridItems) || (currentTab === Tabs.LIST && !portfolioGridItems) ? "none" : "none" }}>
              <Text style={{color:"darkgrey"}}>Nothing has been uploaded here yet.</Text>
          </View>
        </View>    
      </ScrollView>
      <TouchableHighlight onPress={() => { pickMultimedia("IMAGE_VIDEO")}}>
        <View style={[styles.addBtn, {backgroundColor: tintColor}]}>
              <Text style={{color: "white", fontSize:RPP(30)}}>+</Text>
        </View>
      </TouchableHighlight>
      {image && <UploadOverlay image={image} progress={progress}/>}
      {video && <UploadOverlay video={video} progress={progress}/>}
    </View>
  )
}

function manipulateAsync(arg0: any, arg1: ({ rotate: number; } | { flip: any; })[], arg2: { compress: number; format: any; }) {
  throw new Error('Function not implemented.');
}

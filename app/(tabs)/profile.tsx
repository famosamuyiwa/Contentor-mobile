import { View, Text, useThemeColorDefault } from '../../components/Themed'
import { Pressable, ScrollView, useColorScheme, TouchableHighlight, FlatList, Alert } from "react-native";
import { Image } from "expo-image";
import { RPH, RPP } from '../../utils';
import templateStyles from '../stylesheet/tabs/template';
import styles from '../stylesheet/tabs/profile';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react';
import { ListItem, GridItem } from '../../components/shared/portfolioItems';
import { Link, router } from 'expo-router';
import { auth, database } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/thunks/userThunk';
import { Dispatch } from '@reduxjs/toolkit';
import { useFocusEffect } from '@react-navigation/native';
import UploadOverlay from '../../components/shared/upload-overlay-mock';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Default from '../../constants/Default';
import Tabs from '../../constants/Tabs';
import usePortfolioItems from '../../hooks/usePortfolioItems';
import useUserDetails from '../../hooks/useUserDetails';
import useImagePicker from '../../hooks/useImagePicker';
import useFilePicker from '../../hooks/useFilePicker';
import Multimedia from '../../constants/Media';
import useFirestore from '../../hooks/useFirestore';
import { clearUploadData, saveUploadData } from '../../redux/slices/uploadSlice';
import useStorageBucket from '../../hooks/useStorageBucket';
import { RootState } from '../../redux/store';


export default function Profile() {
  const colorScheme = useColorScheme();
  const {tintColor, iconColor} = useThemeColorDefault()
  const userId = auth.currentUser?.uid
  const dispatch: Dispatch<any> = useDispatch();
  const [currentTab, setCurrentTab] = useState(Tabs.GRID)
  const uploadData:any = useSelector((state:RootState) => state.upload.data);

  const { portfolioGridItems, portfolioListItems } = usePortfolioItems(userId || "")
  const { image, video, pickMultimedia, progress: multimediaProgress, setImage, setVideo } = useImagePicker()
  const { audios, docs, pickFiles, progress: fileProgress, setAudios, setDocs } = useFilePicker()
  const { saveMultimediaToDB } = useFirestore()
  const { userDetails, isUserDetailsLoading, isUserDetailsError } = useUserDetails()
  const { uploadMultimedia, progress } = useStorageBucket()

  //refetch user details on screen show
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserDetails(userId || ""));
    }, [dispatch, userId])
  )

  useEffect(() => {
    if(uploadData.save){
      (uploadData.fileType === "image") || (uploadData.fileType === "video") ? handleMediaUpload(uploadData) : handleFileUpload(uploadData)
    }
  }, [uploadData])
  
//------------------------------------------------------------------------------
const handleHeaderUpdate = async () => {
  
  //if user is logged in
  if(userId){
    
    //save file to bucket and return url details
    const bucketDetails: any = await pickMultimedia(Multimedia.IMAGE_VIDEO, true)

    const userRef = collection(database, 'users');
    const q = query(userRef, where("userId", "==", userId));

    console.log(bucketDetails)
    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(database, 'users', querySnapshot.docs[0].id);
        await updateDoc(docRef, { 
            headerPicture: bucketDetails.downloadUrl
         })

         //fetch details again
         dispatch(fetchUserDetails(userId));
        } else {
        return Alert.alert("Error Updating Profile");
      }
    } catch (error:any) {
      return Alert.alert("Error Updating Profile", error.message);
    }
  }
  else{
    console.log("No user is logged in")
  }
}

//------------------------------------------------------------------------------
const handleMediaUpload = async (details: any) => {
  
  //if user is logged in
  if(userId){
    
    await uploadMultimedia(
      {
        uri: details.uri,
        fileType: details.fileType
      },
      function (downloadUrl: string) {
        setImage(""); // Clearing the docs array after upload
        setVideo(""); // Clearing the audios array after upload
        saveToDB(downloadUrl)
      }
    )

    const afterSave = () => {
      dispatch(clearUploadData()) 
    }

    const saveToDB = async (downloadUrl:string) => {
      const mediaDetails: MediaUpload = {
        userId,
        fileType: details.fileType,
        url: downloadUrl,
        createdAt: new Date().toISOString(),
        description: details.description,
        coverUrl: details.coverUrl || ""
      }
    
      //upload file to db
      await saveMultimediaToDB("portfolio", mediaDetails, afterSave);
    }
  }
  else{
    console.log("No user is logged in")
  }
}

//------------------------------------------------------------------------------
const onAddBtnClick = async () => {

    //pick media and return local url details
    const details = currentTab === Tabs.GRID ? await pickMultimedia(Multimedia.IMAGE_VIDEO, false) : await pickFiles(Multimedia.AUDIO_DOC, false)

    dispatch(saveUploadData(details))

    router.push('/uploadOverview')

}

const handleFileUpload = async (details:any) => {
  if(userId){


    await uploadMultimedia(
      {
        uri: details.uri,
        fileType: details.fileType
      },
      function (downloadUrl: string) {
        setDocs([]); // Clearing the docs array after upload
        setAudios([]); // Clearing the audios array after upload
        
        if(details.coverUrl){
          uploadCoverUrl(downloadUrl)
        }else{
          saveToDB(downloadUrl)
        }
      }
    )
   
    const afterSave = () => {
      dispatch(clearUploadData()) 
    }

    const saveToDB = async (downloadUrl:string, coverDownloadUrl?:string) => {
      const fileDetails: MediaUpload = {
        userId,
        fileType: details.fileType,
        url: downloadUrl,
        createdAt: new Date().toISOString(),
        description: details.description,
        coverUrl: coverDownloadUrl || ""
      }
    
      //upload file to db
      await saveMultimediaToDB("portfolio", fileDetails, afterSave);
    }

    const uploadCoverUrl = async (downloadUrl:string) => {
      await uploadMultimedia(
        {
          uri: details.coverUrl,
          fileType: "image"
        },
        function (coverDownloadUrl: string) {
          saveToDB(downloadUrl, coverDownloadUrl)
        }
      )
    }
  }
  else{
    console.log("no user is logged in")
  }
}

  return (  
    <View style={templateStyles.container}>
        <Image
          source={{uri : userDetails.headerPicture ? userDetails.headerPicture : Default.avatar}}
          style={{ width: '100%', height: RPH(60), position:'absolute'}}
        />
        <MaterialCommunityIcons name="image-edit" color="white" style={styles.headerIcon}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => {handleHeaderUpdate()}} style={styles.headerView} />
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
              keyExtractor={(item) => item.url}
              renderItem={({item, index}) => <ListItem 
                                        title={item.description}
                                        uri={item.coverUrl ? item.coverUrl : item.url}
                                        style={{
                                                marginTop:  index === 0 ? RPP(10) : 1, // Add top margin to first item
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
      <TouchableHighlight onPress={() => {  onAddBtnClick() }}>
        <View style={[styles.addBtn, {backgroundColor: tintColor}]}>
              <Text style={{color: "white", fontSize:RPP(30)}}>+</Text>
        </View>
      </TouchableHighlight>
      {uploadData.fileType === "image" && <UploadOverlay image={uploadData.uri} progress={multimediaProgress}/>} 
      {uploadData.fileType === "video" && <UploadOverlay video={uploadData.uri} progress={multimediaProgress}/>}
      {uploadData.fileType === "application/pdf" && <UploadOverlay image={uploadData.coverUrl ? uploadData.coverUrl : uploadData.uri} progress={fileProgress}/>}
      {uploadData.fileType === "audio" && <UploadOverlay image={uploadData.coverUrl} progress={fileProgress}/>} 
    </View>
  )
}


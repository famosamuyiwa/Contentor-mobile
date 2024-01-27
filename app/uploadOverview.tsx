import { View, Text, useThemeColorDefault, TextInput } from '../components/Themed'
import styles from './stylesheet/uploadOverview'
import templateStyles from './stylesheet/template'
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { RPP } from '../utils';
import { Pressable, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {  router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearUploadData, saveUploadData } from '../redux/slices/uploadSlice';
import { Dispatch } from '@reduxjs/toolkit';
import Multimedia from '../constants/Media';
import useImagePicker from '../hooks/useImagePicker';
import { ResizeMode, Video } from "expo-av";

export default function UploadOverview() {
  const {tintColor, borderColor, textColor:color} = useThemeColorDefault()

  const [value, setValue] = useState("")
  const uploadData:any = useSelector((state:RootState) => state.upload.data);
  const dispatch: Dispatch<any> = useDispatch();
  const { pickMultimedia } = useImagePicker()

  useEffect(() => {

  }, [uploadData])

  const handlePost = () => {
    //add cover image and caption to global state
    dispatch(saveUploadData({...uploadData, description: value, save:true}))
    router.back()
  }

  const handleCoverSelection = async () => {
     //pick media and return local url details
     const details:any =  await pickMultimedia(Multimedia.IMAGE_VIDEO, false, true) 

     console.log(details)
     dispatch(saveUploadData({...uploadData, coverUrl: details.uri}))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
          dispatch(clearUploadData()) 
          router.back()
          }}>
            <View style={[templateStyles.backBtnBorder, {borderColor}]}>
                <Ionicons name="chevron-back" style={{color, fontSize: RPP(25)}}/>
            </View>
        </Pressable>
        <Pressable onPress={() => {handlePost()}} style={styles.headerActionContainer}>
          <Text style={[styles.headerText, {textAlign:"right", color: tintColor}]}>Perch</Text>
        </Pressable>
    </View>
      <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => {handleCoverSelection()}} style={styles.mediaContainer}>
            {uploadData.fileType !== "video" && <Image
                source={{uri: uploadData.coverUrl? uploadData.coverUrl : uploadData.uri}}
                style={styles.image}
                contentFit='contain'
            />}
            {uploadData.fileType === "video" && <Video
                source={{uri: uploadData.coverUrl? uploadData.coverUrl : uploadData.uri}}
                style={styles.image}
                resizeMode={ResizeMode.CONTAIN}
                />}
              <View style={[styles.coverLabel, { display: (uploadData.fileType === "image") || (uploadData.fileType === "video") ? "none" : "flex"}]}>
                <Text style={styles.label}>Select cover</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.captionContainer}>
            <TextInput
                      style={[styles.textInput]}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder="Give it a befitting caption..."
                      value={value}
                      onChangeText= {function(newValue:any){ setValue(newValue) }}
                      multiline={true}
                      numberOfLines={4}
                      placeholderTextColor={"darkgrey"}
            />
          </View>
      </View>
    </View>
  )
}
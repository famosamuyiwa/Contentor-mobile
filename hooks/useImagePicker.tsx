import { useState } from "react";
import Multimedia from "../constants/Media";
import * as MediaPicker from 'expo-image-picker';
import useStorageBucket from "./useStorageBucket";


const useImagePicker = () => {

    const [image, setImage] = useState("")
    const [video, setVideo] = useState("")
    const { uploadMultimedia, progress } = useStorageBucket()

    async function pickMultimedia(type:any, isUpload:boolean, editable?:boolean){
      return new Promise(async (resolve, reject) => {

        if(type===Multimedia.IMAGE_VIDEO){
             // No permissions request is necessary for launching the image library
          let result:any = await MediaPicker.launchImageLibraryAsync({
            mediaTypes: MediaPicker.MediaTypeOptions.All,
            allowsEditing: editable,
            aspect: [1,1],
            quality: 1
          });
          if (!result.canceled) {

            const newMedia = {
              uri: result.assets[0].uri,
              fileType: result.assets[0].type
            };

            newMedia.fileType === "image" ? setImage(newMedia.uri) : setVideo(newMedia.uri);
            
            if(isUpload){

              await uploadMultimedia({
                uri: result.assets[0].uri,
                fileType: result.assets[0].type
              },
              function(downloadUrl:any){
                  setImage("")
                  setVideo("")

                  //return promise resolve on successful upload                
                  resolve({ 
                    downloadUrl,  
                    fileType: result.assets[0].type
                  })
              })
            }else{
              resolve(newMedia)
            }
          }
        }
      })
    }
    
    return { image, video, pickMultimedia, setImage, setVideo, progress }
}

export default useImagePicker
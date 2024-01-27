import { useState } from "react";
import Multimedia from "../constants/Media";
import * as FilePicker from 'expo-document-picker';
import useStorageBucket from "./useStorageBucket";


const useFilePicker = () => {

    const [docs, setDocs] = useState<any[]>([])
    const [audios, setAudios] = useState<any[]>([])
    const { uploadMultimedia, progress } = useStorageBucket()

    function pickFiles(type: any, isUpload: boolean) {
      return new Promise(async (resolve, reject) => {

          if (type === Multimedia.AUDIO_DOC) {
            const result = await FilePicker.getDocumentAsync({
              type: ['application/pdf', 'audio/*'],
              multiple: false
            });
        
            if (!result.canceled) {
              const newFile = {
                uri: result.assets[0].uri,
                fileType: result.assets[0].mimeType
              };
        
              if (result.assets[0].mimeType === "application/pdf") {
                setDocs(existingFiles => [...existingFiles, newFile]); // Adding PDF to docs array
              } else {
                setAudios(existingFiles => [...existingFiles, newFile]); // Adding audio to audios array
              }
              
              if(isUpload){
                await uploadMultimedia(
                  newFile,
                  function (downloadUrl: any) {
                    setDocs([]); // Clearing the docs array after upload
                    setAudios([]); // Clearing the audios array after upload
                
                    //return promise resolve on successful upload                

                    resolve({ 
                      downloadUrl,  
                      fileType: result.assets[0].mimeType
                    })
                  }
                )
              }else{
                resolve( newFile )
              }
            }
          }
    })
    }
    
    
    return { docs, audios, pickFiles, setDocs, setAudios, progress }
}

export default useFilePicker
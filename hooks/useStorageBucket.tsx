import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"
import { useState } from "react"

const useStorageBucket = () => {

    const [progress, setProgress] = useState(0)
    
    async function uploadMultimedia( details: any, callback:any ) {
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
                //pass in callback function as arg to run when url has been fetched
                callback(downloadUrl)
              })
          }
        )
      }

      return { uploadMultimedia, progress }
}

export default useStorageBucket
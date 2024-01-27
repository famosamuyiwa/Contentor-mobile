import { addDoc, collection } from "firebase/firestore"
import { auth, database } from "../config/firebase"
import { Alert } from "react-native"

const useFirestore = () => {
    async function saveMultimediaToDB(collectionName:string, details:MediaUpload, callback?:any){
        try{
            // Add media to multimedia collection
            await addDoc(collection(database, collectionName), {
              ...details
            })

            //run callback after saving if passed
            callback()
        }catch(err:any){
          console.log("Error saving media:", err)
        }
      }

      return { saveMultimediaToDB }
      
}

export default useFirestore
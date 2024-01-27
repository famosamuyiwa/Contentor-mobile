import { useCallback, useEffect, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { auth, database } from "../config/firebase";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import useUserDetails from "./useUserDetails";

const useGiftedChat = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const user = auth.currentUser
    const { userDetails, isUserDetailsError, isUserDetailsLoading } = useUserDetails()

    useEffect(() => {
      // Creating a reference to the 'chats' collection in Firestore
      const collectionRef = collection(database, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
      // Setting up a listener for real-time updates using onSnapshot
      const unsubscribe = onSnapshot(q, (snapshot) => {
        // Mapping the received documents to IMessage format
        const newMessages: IMessage[] = snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: (doc.data().createdAt as Timestamp).toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }));
  
        // Updating the state with the new messages
        setMessages(newMessages);
      });
  
      // Unsubscribing the listener when the component unmounts
      return unsubscribe;
    }, []);
  
    const onSend = useCallback(
      (newMessages: IMessage[] = []) => {
        const message = newMessages[0];
  
        if (message) {
          // Adding a new message to the 'chats' collection in Firestore
          addDoc(collection(database, 'chats'), {
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
            sent: true,
            received: true,
            pending: true,
          });
        }
      },
      []
    );

    return {
        messages,
        onSend,
        user,
        userDetails,
    }
}

export default useGiftedChat
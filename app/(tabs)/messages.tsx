import { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { auth, database } from '../../config/firebase';

export default function Messages() {
  const [messages, setMessages] = useState<IMessage[]>([]);

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
        });
      }
    },
    []
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        // Setting the current user's email as the user ID and providing an avatar URL
        _id: auth?.currentUser?.email || '',
        avatar:'https://th.bing.com/th/id/OIP.QnAF4QfqzlEfIvJRzwLtXgHaEK?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      }}
    />
  );
}


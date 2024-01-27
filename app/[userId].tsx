import { Pressable, TouchableOpacity } from 'react-native';
import { View, Text, useThemeColorDefault } from '../components/Themed'
import { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import templateStyles from './stylesheet/template';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RPP } from '../utils';
import styles from './stylesheet/tabs/chatroom';
import { Image } from "expo-image";
import { Actions, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, database } from '../config/firebase';
import useUserDetails from '../hooks/useUserDetails';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';


export default function Chat() {

  const {textColor, backgroundColor, tintColor} = useThemeColorDefault()
  const { userId } = useLocalSearchParams()

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


  return (
    <View style={templateStyles.wrapper2}>
      <View style={styles.header}>
        <Pressable onPress={() => { router.back() }}>
          <View style={{marginLeft: RPP(-5), padding: RPP(5)}}>
              <Ionicons name="chevron-back" style={{color : tintColor, fontSize: RPP(25)}}/>
          </View>
        </Pressable>
        <View>
          <Image 
            source={{uri: "https://th.bing.com/th/id/OIP.QnAF4QfqzlEfIvJRzwLtXgHaEK?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"}}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Faf</Text>
      </View>
      {/* <Text>{userId}</Text> */}
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          // Setting the current user's email as the user ID and providing an avatar URL
          _id: user?.uid || "",
          avatar: userDetails.displayPicture,
        }}
        alwaysShowSend={true}
        messagesContainerStyle={
          {
            backgroundColor
          }
        }
        renderAvatar={null}
        renderSend={(props) => {
          const { text, messageIdGenerator, user, onSend } = props
          return (
            <TouchableOpacity style={{
              height: RPP(40),
              width:RPP(60),
              alignItems:"center",
              justifyContent:"center",
              marginBottom: RPP(5)
            }}
            onPress={() => {
              if(text && onSend){
                onSend({
                })
              }
            }}
            >
              <MaterialCommunityIcons name="send-circle" size={RPP(40)} color={tintColor} />
            </TouchableOpacity>
            
          )
        }}
    />
    </View>

  );

}
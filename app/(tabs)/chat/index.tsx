import { GiftedChat } from 'react-native-gifted-chat';
import useGiftedChat from '../../../hooks/useGiftedChat';
import { View, Text, useThemeColorDefault } from '../../../components/Themed';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { database } from '../../../config/firebase';
import useUserDetails from '../../../hooks/useUserDetails';
import styles from '../../stylesheet/tabs/chat';
import templateStyles from '../../stylesheet/tabs/template';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RPP } from '../../../utils';
import { useEffect, useState } from 'react';
import SearchBar from '../../../components/shared/search-bar';
import ChatItem from '../../../components/shared/chat-items';
import SearchItem from '../../../components/shared/search-items';
import { router } from 'expo-router';

export default function Messages() {

  // const {messages, onSend, user, userDetails} = useGiftedChat()
  const {tintColor} = useThemeColorDefault()


  const { userDetails, isUserDetailsError, isUserDetailsLoading } = useUserDetails()
  const [term, setTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false) 

  
  const chatsQuery = query(
    collection(database, 'rooms'),
    where("participantsArray", "array-contains", userDetails.username)
  )

  useEffect(() => {
    const unsubscribe = onSnapshot( chatsQuery, (querySnapshot) =>{
      const parsedChats = querySnapshot.docs.filter(doc => doc.data().lastMessage).map(doc => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p: { username: string }) => p.username !== userDetails.username)
      }))
      // setRooms(parsedChats)
    })
    return () => unsubscribe()
  }, [])


  return (
    <View style={templateStyles.wrapper}>
      <View style={styles.headerIconContainer}>
        <MaterialCommunityIcons name="square-edit-outline" size={RPP(25)} color={tintColor}/>
      </View>
      <Text style={styles.header}>Chats</Text>
      <View>
        <SearchBar 
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => {
        
          }}
          onFocus={()=> {setIsSearchFocused(true)}}
          unFocus={()=> {
            setIsSearchFocused(false)
            setTerm("")
          }}
          isFocused={isSearchFocused}
          placeholder="Search"
        />
      </View>
      <View>
        <ChatItem 
            onPress={() => {
              router.push({
                pathname: "/[userId]",
                params: {userId : 1}
              })
            }}
            data={{
              key: 1,
              name: "horus",
              lastText:"bitch nigga snitch nigga hoe",
              avatar: "https://th.bing.com/th/id/OIP.QnAF4QfqzlEfIvJRzwLtXgHaEK?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
              isRead: true,
              time: "2h"
            }}
          />
      </View>
    </View>
  )
}


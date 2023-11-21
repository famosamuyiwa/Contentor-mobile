import { GiftedChat } from 'react-native-gifted-chat';
import useGiftedChat from '../../hooks/useGiftedChat';

export default function Messages() {

  const {messages, onSend, user, userDetails} = useGiftedChat()

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        // Setting the current user's email as the user ID and providing an avatar URL
        _id: user?.uid || "",
        avatar: userDetails.displayPicture,
      }}
    />
  );
}


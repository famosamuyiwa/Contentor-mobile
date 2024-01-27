import { TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/Themed'
import { FadeInViewToggled } from '../../components/shared/animations'
import { useState } from 'react';
import UploadOverlay from '../../components/shared/upload-overlay-mock';


export default function Home() {

  const [isVisible, setIsVisible] = useState(false)



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FadeInViewToggled style={{ width: 250, height: 50, backgroundColor: 'powderblue' }} isVisible={isVisible}>
        <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading In!</Text>
      </FadeInViewToggled>
      <TouchableOpacity onPress={()=> {setIsVisible(!isVisible)}}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>

  );

}
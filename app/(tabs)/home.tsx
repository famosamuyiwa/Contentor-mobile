import { TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/Themed'
import { FadeInViewToggled } from '../../components/shared/animations'
import { useState } from 'react';
import ProgressBar from '../../components/shared/progress-bar';
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
      <UploadOverlay progress={80} image="https://firebasestorage.googleapis.com/v0/b/contentor-401816.appspot.com/o/Stuff%2F1700328267957?alt=media&token=dbf65be1-1a1a-4045-8c3f-6689342eeb0e"/>
    </View>

  );

}
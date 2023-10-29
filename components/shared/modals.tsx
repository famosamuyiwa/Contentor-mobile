import { Modal, Pressable, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text, useThemeColorDefault } from '../Themed';
import { styles } from '../stylesheet/shared/modals';
import { RPP } from '../../utils';
import { RegularButton } from './buttons';
import templateStyles from '../stylesheet/template';

function SuccessModal({ isVisible, onClose, onButtonPress, buttonText, header, subHeader}: any) {

  const {modalContentBackground, modalTitleBackground, textColor} = useThemeColorDefault()

  return (
    <Modal  animationType="slide" transparent={true} visible={isVisible}>
       <View style={styles.backgroundDim}>
            <View style={[styles.modalContent, {backgroundColor: modalContentBackground}]}>
                <View style={[styles.titleContainer, {backgroundColor: modalTitleBackground, display:`${onClose? "flex" : "none"}`}]}>
                <Pressable onPress={onClose}>
                    <MaterialIcons name="close" color={textColor} size={22} />
                </Pressable>
                </View>
                <View style={[styles.container, {backgroundColor: modalContentBackground}]}>
                    <Image source={require('../../assets/images/success.png')} fadeDuration={0} style={{ width: RPP(50), height: RPP(50) }} />
                    <View style={[{backgroundColor: modalContentBackground, width: '80%', alignItems:"center" }]}>
                        <Text style={{fontFamily:"Satoshi_Bold", fontSize: 20, marginBottom: RPP(10) }}>{header}</Text>
                        <Text style={{textAlign:"center"}}>{subHeader}</Text>
                    </View>
                    <View style={[templateStyles.buttonSize, {backgroundColor: modalContentBackground}]}>
                        <RegularButton 
                            isActive={true}
                            content={buttonText}
                            onPress={onButtonPress}
                        />
                    </View>
                </View>
            </View>
       </View> 
    </Modal>
  );
}

export {
    SuccessModal
}
import { Pressable, Keyboard } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { styles } from '../stylesheet/shared/search-bar'
import { View, Text, TextInput, useThemeColorDefault } from "../Themed";


const SearchBar = ({ term, onTermChange, onTermSubmit, onFocus, isFocused, unFocus, style, placeholder }: any) => {
  
 const { searchBarBackground } = useThemeColorDefault()
 
  return (
    <View style={[styles.backgroundStyle, style, {backgroundColor: searchBarBackground}]}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={placeholder}
        value={term}
        onChangeText={onTermChange}
        onSubmitEditing={onTermSubmit}
        onFocus={onFocus}
        
      />
      <Pressable onPressIn={Keyboard.dismiss} onPress={unFocus} style={{alignSelf:"center", paddingHorizontal:10, display:`${isFocused? "flex" : "none"}`}}>
        <AntDesign size={20} color="grey" name="close"/>
      </Pressable>
    </View>
  );
};


export default SearchBar;


// const SearchBar2 = ({style, placeholder, textStyle}) => {
  
//   return (
//     <View style={[styles.backgroundStyle, style]}>
//       <Feather name="search" style={styles.iconStyle} />
//       <View  style={[styles.inputStyle, {paddingRight:10}]}>
//         <Text style={textStyle} numberOfLines={1}>{placeholder}</Text>
//       </View>
//     </View>
//   );
// };

// export {
//   SearchBar2
// } 

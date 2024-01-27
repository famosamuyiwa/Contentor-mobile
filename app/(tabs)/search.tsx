import { useState } from 'react';
import { View, Text } from '../../components/Themed'
import SearchBar from '../../components/shared/search-bar'
import { Octicons} from '@expo/vector-icons';
import templateStyles from '../stylesheet/tabs/template';
import styles from '../stylesheet/tabs/search';
import SearchItem from '../../components/shared/search-items';


export default function Search() {
  const [term, setTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false) 

  return (
    <View style={templateStyles.wrapper}>
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
        placeholder="Search for a creator"
      />
      <View style={{display: isSearchFocused ? "flex" : "none"}}>
        <SearchItem 
          onPress={() => {

          }}
          data={{
            username: "vrebel__",
            name: "horus",
            avatar: "https://th.bing.com/th/id/OIP.QnAF4QfqzlEfIvJRzwLtXgHaEK?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          }}
        />
      </View>
      <View style={[styles.container2, {display: isSearchFocused ? "none" : "flex"}]}>
        <View>
            <Text style={{fontFamily: "Satoshi_Medium"}}>Search history</Text>
            <View style={styles.historyContainer}>
                <Octicons size={20} style={{color:"darkgrey", marginRight:10}} name="history"/>
                <Text style={{fontFamily: "Satoshi_Medium"}}>Test Text</Text>
            </View>
        </View>
      </View>
    </View>
  )
}
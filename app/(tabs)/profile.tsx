import { View, Text, useThemeColorDefault } from '../../components/Themed'
import { Pressable, ScrollView, useColorScheme, TouchableHighlight, FlatList } from "react-native";
import { Image } from "expo-image";
import { RPH, RPP } from '../../utils';
import templateStyles from '../stylesheet/tabs/template';
import styles from '../stylesheet/tabs/profile';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';
import { FolderItem, GridItem } from '../../components/shared/portfolioItems';
import portfolio from "../../assets/data/portfolio.json"
import { Link } from 'expo-router';

export default function Profile() {
  const colorScheme = useColorScheme();
  const {tintColor, iconColor} = useThemeColorDefault()

  const Tabs = {
    grid: "GRID",
    folder: "FOLDER"
  }


  const [currentTab, setCurrentTab] = useState(Tabs.grid)

  return (
    <View style={templateStyles.container}>
      <Image
          source={{uri : 'https://th.bing.com/th/id/OIP.eLmLdeb-NsySeV4PkziejwHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'}}
          style={{ width: '100%', height: RPH(60), position:'absolute'}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{uri : 'https://th.bing.com/th/id/OIP.0QSiosoe-ckhHxeDxjKckAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.5&pid=1.7'}}
              style={styles.profileImage}
            />
          </View>
          <Link asChild href="/editProfile">
            <Pressable style={styles.editIconWrapper}>
              <MaterialCommunityIcons name="account-edit" style={{fontSize: RPP(25), color: iconColor}} />
            </Pressable>
          </Link>
          <View style={{paddingLeft:RPP(5)}}>
            <Text style={{fontFamily: "Satoshi_Bold", fontSize: RPP(18)}}>Horus</Text>
            <Text style={{color:"grey"}}>@vrebel__</Text>
            <View style={{flexDirection:"row", marginTop:RPP(2 )}}>
              <View style={{flexDirection:"row", alignItems: "baseline", marginRight:RPP(10)}}>
                <Ionicons name={colorScheme === 'dark' ? "briefcase-sharp" : "briefcase-outline"} style={{color:"grey", marginRight:RPP(5)}}/>
                <Text style={{fontSize:RPP(14), color:"grey"}}>Artist</Text>
              </View>
              <View style={{flexDirection:"row", alignItems: "baseline"}}>
                <AntDesign name="link" style={{color:"grey", marginRight:RPP(5)}}/>
                <Text style={{fontSize:RPP(14), color:tintColor}}>www.contentor.ng</Text>
              </View>
            </View>
            <View style={{marginVertical:RPP(5)}}>
              <Text>Let's have a world class day</Text>
            </View>  
          </View>
          <View style={styles.tabFilter}>
            <Pressable onPress={function(){
              setCurrentTab(Tabs.grid)
              }} 
              style={[styles.tab, {borderColor: `${ currentTab === Tabs.grid ? tintColor : "lightgrey"}`}]}>
                <Ionicons name="grid-outline" style={{fontSize: RPP(20), color: `${ currentTab === Tabs.grid ? tintColor : "lightgrey"}`}} />
            </Pressable>
            <Pressable onPress={function(){
              setCurrentTab(Tabs.folder)
              }} 
                style={[styles.tab, {borderColor: `${ currentTab === Tabs.folder ? tintColor : "lightgrey"}`}]}>
              <Ionicons name="folder-outline" style={{fontSize: RPP(20), color: `${ currentTab === Tabs.folder ? tintColor : "lightgrey"}`}}/>
            </Pressable>
          </View>
          <View style={[{display: `${ currentTab === Tabs.grid ? "flex" : "none"}`}]}>
            <FlatList
              numColumns={3} // Set the number of columns you want
              style={{marginBottom: RPP(10)}}
              showsVerticalScrollIndicator={false}
              data={portfolio.grid}
              renderItem={({item, index}) => <GridItem 
                                                uri={item.uri}
                                                style={{
                                                        marginLeft: index % 3 === 1 ? RPP(10) : 0, // Add left margin to items in the middle
                                                        marginRight: index % 3 === 1 ? RPP(10) : 0, // Add right margin to items in the middle
                                                        marginTop:  RPP(10) // Add top margin to all
                                                      }}
                                             />
                          }
              scrollEnabled={false}
            />
          </View>
          <View style={[{display: `${ currentTab === Tabs.folder ? "flex" : "none"}`}]}>
            <FlatList
              style={{marginBottom: RPP(10)}}
              showsVerticalScrollIndicator={false}
              data={portfolio.folder}
              renderItem={({item, index}) => <FolderItem 
                                        title={item.title}
                                        uri={item.uri}
                                        style={{
                                                marginTop:  index === 0 ? RPP(10) : 0, // Add top margin to first item
                                                paddingVertical:  RPP(10) // Add vertical padding to all
                                              }}
                                       />
                          }
              scrollEnabled={false}

            />
          </View>
        </View>    
      </ScrollView>
      <TouchableHighlight onPress={()=>{}}>
        <View style={[styles.addBtn, {backgroundColor: tintColor}]}>
              <Text style={{color: "white", fontSize:RPP(30)}}>+</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}
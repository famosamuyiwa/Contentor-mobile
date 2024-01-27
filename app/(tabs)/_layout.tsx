import { Tabs } from "expo-router";
import { useThemeColorDefault } from "../../components/Themed";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { ProfileTabIcon } from "../../components/shared/profile-tab-icon";
import { RPP } from "../../utils";

export default function _layout() {
    const {tintColor} = useThemeColorDefault()

    return (
        <Tabs 
            screenOptions={({route}) => ({
                    tabBarHideOnKeyboard: true ,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: tintColor,
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName:any ;
                      
                    if (route.name === 'home') {
                      iconName = (focused ? 'home-sharp' : 'home-outline')
                    } 
                    else if (route.name === 'search') {
                      iconName = "search"
                    }
                    else if (route.name === 'profile') {
                      return <ProfileTabIcon focused={focused} color={color} size={size}/>
                    }else if (route.name === 'chat'){
                      iconName = "mail"
                      return <Foundation name={iconName} size={size+RPP(5)} color={color} />;
                    }

                      return <Ionicons name={iconName} size={size} color={color} />;
                    }
                  })
            }
        >
            <Tabs.Screen name="home" options={{
                headerTitle: "Home",
                tabBarLabel: "Home"
            }} 
            />
            <Tabs.Screen name="chat" options={{
                headerShown: false,
                headerTitle: "Chat",
                tabBarLabel: "Chat"
            }} 
            />
            <Tabs.Screen name="search" options={{
                headerShown: false,
                headerTitle: "Search",
                tabBarLabel: "Search"
            }} 
            />
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                tabBarLabel: "Profile"
            }} 
            />
        </Tabs>
    )
}
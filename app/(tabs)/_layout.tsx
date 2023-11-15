import { Tabs } from "expo-router";
import { useThemeColorDefault } from "../../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { ProfileTabIcon } from "../../components/shared/profile-tab-icon";

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
            <Tabs.Screen name="search" options={{
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
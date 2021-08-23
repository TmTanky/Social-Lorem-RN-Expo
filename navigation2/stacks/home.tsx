import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Constants
import { celticB, lightMode, darkMode } from "../../constants/Colors";

// Screens
import HomeScreen from "../../screens/home/home";
import MyProfileScreen from "../../screens/myProfile/myProfile";

const Home = createNativeStackNavigator()
const MyProfile = createNativeStackNavigator()

export const HomeStack2 = () => {

    const { Navigator, Screen } = Home
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={() => {

            return {
                headerStyle: {
                    backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                },
                headerTintColor: celticB,
                headerTitleStyle: {
                    fontFamily: 'opsBold'
                },
                animation: "slide_from_right",
                animationTypeForReplace: 'push'
            }

        }} >
            <Screen name="homestack" options={(props) => {
                return {
                    headerRight: () => {
                        return <MaterialIcons name="search" color={celticB} onPress={() => props.navigation.navigate('search')} size={25} />
                    },
                    headerTitle: 'Home'
                }
            }} component={HomeScreen} />
        </Navigator>
    )

}

export const MyProfile2 = () => {

    const { Navigator, Screen } = MyProfile
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={() => {

            return {
                headerStyle: {
                    backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                },
                headerTintColor: celticB,
                headerTitleStyle: {
                    fontFamily: 'opsBold'
                },
                animation: "slide_from_right",
            }

        }} >
            <Screen name="myprofilestack" options={(props) => {
                return {
                    headerTitle: 'My Profile',
                    headerRight: () => {
                        return <Ionicons onPress={() => {
                            props.navigation.navigate('settings')
                        }} name="person-circle-outline" color={celticB} size={30} />
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                    }
                }
            }}  component={MyProfileScreen} />
        </Navigator>
    )

}
import React from "react";
import { View, useColorScheme } from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Stacks
import { HomeStack2, MyProfile2 } from "../stacks/home";
import SearchScreen from "../../screens/home/search";
import ViewProfileScreen from "../../screens/globalScreens/viewProfile";
import LikesOrCommentsScreen from "../../screens/globalScreens/likesOrComments";
import { SettingsNavigator } from "../../screens/settings/settings";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

const BottomTab = createMaterialBottomTabNavigator()
const BottomTabStack = createNativeStackNavigator()

export const BottomTabNavigator2 = () => {

    const { Navigator, Screen } = BottomTab
    const deviceTheme = useColorScheme()

    return (
        <Navigator shifting={true} style={{
            backgroundColor: deviceTheme === 'light' ? lightMode : darkMode,
        }} barStyle={{
            backgroundColor: deviceTheme === 'light' ? lightMode : darkMode,
            elevation: 0,
            justifyContent: 'center',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: 70,
        }} sceneAnimationEnabled={true} initialRouteName="home"
            inactiveColor={deviceTheme === 'light' ? lightMode : darkMode}
            activeColor={celticB}
        >

            <Screen name="homebottomtab" options={{
                tabBarLabel: 'Home',
                tabBarIcon: (props) => {
                    return <View>
                        <Ionicons name="home-outline" color={props.focused ? celticB : deviceTheme === 'light' ? darkMode : lightMode} size={23} />
                    </View>
                }
            }} component={HomeStack2} />
            <Screen name="myprofiletab" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: (props) => {
                    return <View>
                    <Ionicons name="person-outline" color={props.focused ? celticB : deviceTheme === 'light' ? darkMode : lightMode} size={23} />
                </View>
                },
            }} component={MyProfile2} />

        </Navigator>
    )

} 

export const BottomTabStackNavigator2 = () => {

    const { Navigator, Screen } = BottomTabStack
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={{
            animation: "slide_from_right",
        }} >

            <Screen name="withtabs" options={{headerShown: false}} component={BottomTabNavigator2} />
            <Screen name="search" options={(props) => {
                return {
                    headerTitle: 'Search',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                    },
                    headerTintColor: celticB,
                }
            }} component={SearchScreen} />
            <Screen name="settings" options={{headerShown: false}} component={SettingsNavigator} />
            <Screen name="viewprofile" options={(props) => {
                const { id, username } = props.route.params as { id: string, username: string }
                return { 
                    headerTitle: `@${username}`,
                    headerStyle: {
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                    },
                    headerTintColor: celticB,
                    animation: 'fade'
                }
            }} component={ViewProfileScreen} />
            <Screen name="likesorcomments" options={(props) => {
                const { mode } = props.route.params as { mode: string }
                return { 
                    headerTitle: mode,
                    headerStyle: {
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                    },
                    headerTintColor: celticB,
                    animation: 'slide_from_left'
                }
            }} component={LikesOrCommentsScreen} />

        </Navigator>
    )

} 
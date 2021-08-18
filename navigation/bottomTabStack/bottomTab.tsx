import React from "react";
import { View, Text, TouchableNativeFeedback, useColorScheme } from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Navigators
import { HomeStackNavigator } from "../../screens/home/home";
import { MyProfileStackNavigator } from "../../screens/myProfile/myProfile";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

const BottomTab = createMaterialBottomTabNavigator()
const BottomTabStack = createNativeStackNavigator()

export const BottomTabNavigator = () => {

    const { Navigator, Screen } = BottomTab
    const deviceTheme = useColorScheme()

    return (
        <Navigator shifting={true} style={{
            backgroundColor: deviceTheme === 'light' ? lightMode : darkMode,
        }} barStyle={{
            backgroundColor: deviceTheme === 'light' ? lightMode : darkMode,
            elevation: 5,
            justifyContent: 'center',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: 70,
        }} initialRouteName="home"
            inactiveColor={deviceTheme === 'light' ? lightMode : darkMode}
            activeColor={celticB}
        >

            <Screen name="home" options={{
                tabBarLabel: 'Home',
                tabBarIcon: (props) => {
                    return <View>
                        <Ionicons name="home-outline" color={props.focused ? celticB : deviceTheme === 'light' ? darkMode : lightMode} size={23} />
                    </View>
                }
            }} component={HomeStackNavigator} />

            <Screen name="myprofile" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: (props) => {
                    return <View>
                    <Ionicons name="person-outline" color={props.focused ? celticB : deviceTheme === 'light' ? darkMode : lightMode} size={23} />
                </View>
                },
            }} component={MyProfileStackNavigator} />


        </Navigator>
    )

}

export const BottomTabStackNavigator = () => {

    const { Navigator, Screen } = BottomTabStack

    return (
        <Navigator>
            <Screen name="bottomtabstack" component={BottomTabNavigator} />
        </Navigator>
    )

}
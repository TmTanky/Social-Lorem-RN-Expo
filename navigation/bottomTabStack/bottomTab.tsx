import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Navigators
import { HomeStackNavigator } from "../../screens/home/home";
import { MyProfileStackNavigator } from "../../screens/myProfile/myProfile";

const BottomTab = createMaterialBottomTabNavigator()

export const BottomTabNavigator = () => {

    const { Navigator, Screen } = BottomTab

    return (
        <Navigator shifting={true} >

            <Screen name="home" options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => {
                    return <MaterialIcons name="home" color="white" size={25} />
                },
                tabBarColor: '#2282A4'
            }} component={HomeStackNavigator} />

            <Screen name="myprofile" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: () => {
                    return <MaterialIcons name="person" color="white" size={25} />
                },
                tabBarColor: '#006992'
            }} component={MyProfileStackNavigator} />

        </Navigator>
    )

}
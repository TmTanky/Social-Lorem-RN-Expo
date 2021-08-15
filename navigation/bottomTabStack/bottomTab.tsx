import React from "react";
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Navigators
import { HomeStackNavigator } from "../../screens/home/home";
import { MyProfileStackNavigator } from "../../screens/myProfile/myProfile";

const BottomTab = createMaterialBottomTabNavigator()

export const BottomTabNavigator = () => {

    const { Navigator, Screen } = BottomTab

    return (
        <Navigator shifting={true} style={{
            backgroundColor: 'white',
        }} barStyle={{
            backgroundColor: 'white',
            elevation: 5,
            justifyContent: 'center',
            // marginBottom: 20,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: 70,
            // marginHorizontal: 15,
            // marginVertical: 10,
            // padding: 5,
        }} inactiveColor="transparent" activeColor="#3373C4" >

            <Screen name="home"  options={{
                tabBarLabel: 'Home',
                tabBarIcon: (props) => {
                    return <View>
                        <Ionicons name="home-outline" color={props.focused ? '#3373C4' : '#202020'} size={23} />
                    </View>
                }
            }} component={HomeStackNavigator} />

            <Screen name="myprofile" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: (props) => {
                    return <View>
                    <Ionicons name="person-outline" color={props.focused ? '#3373C4' : '#202020'} size={23} />
                </View>
                }
            }} component={MyProfileStackNavigator} />


        </Navigator>
    )

}
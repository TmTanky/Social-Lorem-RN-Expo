import React, { FC, useEffect } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Switch, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangeUsernameScreen } from "./settingsTab/changeUsername";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Appearance } from 'react-native-appearance'

// Constants
import { celticB, lightMode, darkMode } from "../../constants/Colors";

// Redux
import { logoutAll, toggleDark, toggleLight } from "../../redux/actions/actions";
import { ChangePasswordScreen } from "./settingsTab/changePassword";

// Types
import { Istate } from "../../types";
import { useState } from "react";

const Settings = createNativeStackNavigator()

const RootSettingsScreen: FC = (props: any) => {

    const dispatch = useDispatch()
    const deviceTheme = useColorScheme()
    // const theme = useSelector((state: Istate) => state.theme)

    // const toggleTheme = () => {
    //     theme === 'DARK' ? dispatch(toggleLight()) : dispatch(toggleDark())
    // }

    return (
        <View style={{...s.root, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}} >
            
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('changeusername')
            }} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={{...s.txtItems, color: deviceTheme === 'light' ? darkMode : lightMode}}> Change Username </Text>
                    <Ionicons style={{flex: 1}} color={celticB} name="chevron-forward-outline" size={25} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('changepassword')
            }} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={{...s.txtItems, color: deviceTheme === 'light' ? darkMode : lightMode}}> Change Password </Text>
                    <Ionicons style={{flex: 1}} color={celticB} name="chevron-forward-outline" size={25} />   
                </View>
            </TouchableOpacity>
            {/* <View style={s.items}>
                <Text style={s.txtItems}> Dark Mode </Text>
                <Switch style={{marginRight: 10}} thumbColor={celticB} onValueChange={toggleTheme} value={ theme === 'LIGHT' ? false : true } />
            </View> */}
            <TouchableOpacity onPress={() => dispatch(logoutAll())} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={{...s.txtItems, color: deviceTheme === 'light' ? darkMode : lightMode}}> Logout </Text>
                    <Ionicons style={{flex: 1}} color={celticB} name="log-out-outline" size={25} />
                </View>
            </TouchableOpacity>

        </View>
    )

}

export default RootSettingsScreen

export const SettingsNavigator = () => {

    const { Navigator, Screen } = Settings
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
            }
        }}>

            <Screen name="mainsettings" options={{
                headerTitle: 'Settings',
                headerTintColor: celticB
            }} component={RootSettingsScreen} />

            <Screen name="changeusername" options={{
                animation: "slide_from_right",
                headerTitle: 'Username',
                headerTintColor: celticB
            }} component={ChangeUsernameScreen} />

            <Screen name="changepassword" options={{
                animation: "slide_from_right",
                headerTitle: 'Password',
                headerTintColor: celticB
            }} component={ChangePasswordScreen} />

        </Navigator>
    )

}

const s = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 20
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtItems: {
        fontFamily: 'opsReg',
        margin: 20,
        flex: 7
    }
})

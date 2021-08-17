import React, { FC } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangeUsernameScreen } from "./settingsTab/changeUsername";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

// Redux
import { logoutAll } from "../../redux/actions/actions";
import { ChangePasswordScreen } from "./settingsTab/changePassword";

const Settings = createNativeStackNavigator()

const RootSettingsScreen: FC = (props: any) => {

    const dispatch = useDispatch()

    return (
        <View style={s.root} >
            
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('changeusername')
            }} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={s.txtItems}> Change Username </Text>
                    <Ionicons style={{flex: 1}} color="#3373C4" name="chevron-forward-outline" size={25} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('changepassword')
            }} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={s.txtItems}> Change Password </Text>
                    <Ionicons style={{flex: 1}} color="#3373C4" name="chevron-forward-outline" size={25} />   
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(logoutAll())} activeOpacity={0.5}>
                <View style={s.items}>
                    <Text style={s.txtItems}> Logout </Text>
                    <Ionicons style={{flex: 1}} color="#3373C4" name="log-out-outline" size={25} />
                </View>
            </TouchableOpacity>

        </View>
    )

}

export default RootSettingsScreen

export const SettingsNavigator = () => {

    const { Navigator, Screen } = Settings

    return (
        <Navigator>

            <Screen name="mainsettings" options={{
                headerTitle: 'Settings'
            }} component={RootSettingsScreen} />

            <Screen name="changeusername" options={{
                animation: "slide_from_right",
                headerTitle: 'Username'
            }} component={ChangeUsernameScreen} />

            <Screen name="changepassword" options={{
                animation: "slide_from_right",
                headerTitle: 'Password'
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

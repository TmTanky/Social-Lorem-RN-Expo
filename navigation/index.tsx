import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// Navigators
import { AuthNavigator } from "./stack/auth";
import { BottomTabStackNavigator, BottomTabNavigator } from "./bottomTabStack/bottomTab";

// Types
import { Istate } from "../types";

const Main = createNativeStackNavigator()

export const MainNavigator = () => {

    const isAuth = useSelector((state: Istate) => state.auth)
    const { Navigator, Screen } = Main

    return (
        <Navigator>
            <Screen options={{
                headerShown: false
            }} name="main" component={ !isAuth ? AuthNavigator : BottomTabNavigator } /> 
        </Navigator>
    )

}
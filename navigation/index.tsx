import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// Navigators
import { AuthNavigator } from "./stack/auth";
import { BottomTabNavigator } from "./bottomTabStack/bottomTab";

// Types
import { Istate } from "../types";

const Main = createNativeStackNavigator()

export const MainNavigator = () => {

    const isAuth = useSelector((state: Istate) => state.auth)
    const { Navigator: N, Screen: S } = Main

    return (
        <N>
            { !isAuth ? <AuthNavigator/> : <BottomTabNavigator/> }
        </N>
    )

}
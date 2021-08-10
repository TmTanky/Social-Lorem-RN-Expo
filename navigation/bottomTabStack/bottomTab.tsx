import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../../screens/home/home";

const BottomTab = createMaterialBottomTabNavigator()

export const BottomTabNavigator = () => {

    const { Navigator: N, Screen: S } = BottomTab

    return (
        <N>
            <S name="home" component={HomeScreen} />
        </N>
    )

}
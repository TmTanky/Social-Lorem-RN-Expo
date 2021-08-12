import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth/auth";

const Auth = createNativeStackNavigator()

export const AuthNavigator = () => {

    const { Navigator, Screen } = Auth

    return (
        <Navigator>
            <Screen name="login-register" component={AuthScreen} />
        </Navigator>
    )

}
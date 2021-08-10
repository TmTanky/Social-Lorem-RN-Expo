import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth/auth";

const Auth = createNativeStackNavigator()

export const AuthNavigator = () => {

    const { Navigator: N, Screen: S } = Auth

    return (
        <N>
            <S name="login-register" component={AuthScreen} />
        </N>
    )

}
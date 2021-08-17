import React, { useState } from "react";
import { View, Text } from 'react-native'

// Components
import Login from "../../components/normal/auth/login";
import Register from "../../components/normal/auth/register";

// Types
type Mode = 'login' | 'register'

const AuthScreen = () => {

    const [mode, setMode] = useState<Mode>('login')

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            { mode === 'login' ? <Login toggleMode={setMode} /> : <Register toggleMode={setMode} /> }
        </View>
    )

}

export default AuthScreen
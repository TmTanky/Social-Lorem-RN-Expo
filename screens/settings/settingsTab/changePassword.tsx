import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Input } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { changePassword } from '../../../redux/actions/actions'

// Constants
import { celticB, lightMode, darkMode } from '../../../constants/Colors'

// Types
import { Istate } from '../../../types'

export const ChangePasswordScreen = () => {

    const dispatch = useDispatch()
    const userID = useSelector((state: Istate) => state.user._id)!
    const token = useSelector((state: Istate) => state.user.token)!
    const deviceTheme = useColorScheme()

    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [isNotSame, setIsNotSame] = useState(false)

    const submitPass = async () => {

        setIsNotSame(false)

        if (newPass !== confirmPass) {
            return setIsNotSame(true)
        }

        dispatch(changePassword(userID, newPass, token))
        setNewPass("")
        setConfirmPass("")

    }

    return (
        <View style={{flex: 1, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>
            <View style={s.formRoot}>

                <Input label="New Password" labelStyle={{
                    fontFamily: 'opsLight',
                    fontSize: 15,
                    color: celticB
                }} inputStyle={{
                    fontSize: 15,
                    color: deviceTheme === 'light' ? darkMode : lightMode
                }} leftIcon={{
                    type: 'ionicon',
                    name: "key-outline",
                    color: celticB
                }} secureTextEntry={true} value={newPass} onChangeText={setNewPass} />

                <Input label="Confirm Password" labelStyle={{
                    fontFamily: 'opsLight',
                    fontSize: 15,
                    color: celticB
                }} inputStyle={{
                    fontSize: 15,
                    color: deviceTheme === 'light' ? darkMode : lightMode
                }} leftIcon={{
                    type: 'ionicon',
                    name: "key",
                    color: celticB
                }} secureTextEntry={true} value={confirmPass} onChangeText={setConfirmPass} errorMessage={ isNotSame ? 'Password must match.' : undefined } />

                { (newPass && confirmPass).length > 0 ? <TouchableOpacity onPress={submitPass} activeOpacity={0.7} >
                    <View style={s.btn}>
                        <Text style={{fontFamily: 'opsReg', color: celticB}}> Confirm </Text>
                    </View>
                </TouchableOpacity> : null }

            </View>
        </View>
    )

}


const s = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white'
    },
    usernameRoot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20
    },
    username: {
        fontFamily: 'opsReg',
        fontSize: 18
    },
    formRoot: {
        margin: 20
    },
    input: {
        marginVertical: 20,
        height: 40,
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: 'opsReg',
        paddingHorizontal: 10
    },
    btn: {
        height: 40,
        // backgroundColor: "#3373C4",
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: "#3373C4",
        // borderWidth: 2,
        // borderRadius: 5
    },
    btn2: {
        height: 40,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        // borderColor: 'red',
        // borderWidth: 2,
        // borderRadius: 5
    }
})
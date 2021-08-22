import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { Input } from 'react-native-elements'

// Types
import { Istate } from '../../../types'

// Redux
import { changeUsername } from '../../../redux/actions/actions'

// Constants
import { celticB, lightMode, darkMode } from '../../../constants/Colors'

export const ChangeUsernameScreen = () => {

    const dispatch = useDispatch()
    const username = useSelector((state: Istate) => state.names.username)
    const userID = useSelector((state: Istate) => state.user._id)
    const token = useSelector((state: Istate) => state.user.token)
    const deviceTheme = useColorScheme()
    
    const [editMode, setEditMode] = useState(false)
    const [userInput, setUserInput] = useState(username)

    const usernameHandler = async () => dispatch(changeUsername(userID!, userInput, token!)) as unknown

    const submitForm = async () => {

        usernameHandler().then((res => {
            res === 'Username Changed Successfully' && ToastAndroid.showWithGravity(res, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setUserInput("")
        })).catch(err => {
            err === 'Failed' && ToastAndroid.showWithGravity('Please try again', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        })
        setEditMode(prev => !prev)

    } 

    return (
        <View style={{...s.root, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

            { editMode ? <View style={s.formRoot}>

                <View>
                    {/* <TextInput style={s.input} value={userInput} onChangeText={setUserInput} /> */}
                    <Input label="Username" labelStyle={{
                        fontFamily: 'opsLight',
                        fontSize: 15,
                        color: celticB
                    }} inputStyle={{
                        fontSize: 15,
                        color: deviceTheme === 'light' ? darkMode : lightMode
                    }} leftIcon={{
                        type: 'ionicons',
                        name: "person-outline",
                        color: celticB
                    }} value={userInput} onChangeText={setUserInput} />
                </View>
                
                <TouchableOpacity onPress={submitForm} activeOpacity={0.7} >
                    <View style={s.btn}>
                        <Text style={{fontFamily: 'opsReg', color: celticB}}> Confirm </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setEditMode(prev => !prev)} activeOpacity={0.7} >
                    <View style={s.btn2}>
                        <Text style={{fontFamily: 'opsReg', color: 'red'}}> Cancel </Text>
                    </View>
                </TouchableOpacity>

            </View> : <TouchableOpacity onPress={() => setEditMode(prev => !prev)}>

                <View style={s.usernameRoot}>
                    <Text style={{...s.username, color: deviceTheme === 'light' ? darkMode : lightMode}}> @{username} </Text>
                    <Ionicons name="pencil-sharp" size={20} color={celticB} />
                </View>

            </TouchableOpacity> }

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
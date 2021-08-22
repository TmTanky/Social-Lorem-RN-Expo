import React, { useState, FC } from "react";
import { View, Text, TextInput, StyleSheet, TouchableHighlight, useColorScheme, ToastAndroid } from 'react-native'
import { useDispatch } from "react-redux";

// Constants
import { celticB, lightMode, darkMode } from "../../../constants/Colors";

// Redux
import { createPost } from '../../../redux/actions/actions'

// Types
interface Props {
    token?: string
    postBy?: string
}

export const CreatePostComponent: FC<Props> = (props) => {

    const {token, postBy} = props

    const dispatch = useDispatch()
    const deviceTheme = useColorScheme()

    const [userInput, setUserInput] = useState("")

    const create = async () => {

        const data = dispatch(createPost(token!, postBy!, userInput)) as unknown
        // setUserInput("")
        // return createResults

        return data

    }

    const submitCreate = async () => {
        create().then((res => {
            res === 'Done' && ToastAndroid.showWithGravity('Post Created', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setUserInput("")
        })).catch(err => {
            err === 'Failed' && ToastAndroid.showWithGravity('Please try again', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        })
    }

    return (
        <View style={{...s.root, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>
            <Text style={{fontFamily: 'opsSemi', fontSize: 18, marginVertical: 5, color: deviceTheme === 'light' ? darkMode : lightMode}}> Create Post </Text>
            <TextInput placeholderTextColor={deviceTheme === 'light' ? 'gray' : lightMode} style={{...s.input, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode, color: deviceTheme === 'light' ? darkMode : lightMode}} value={userInput} onChangeText={setUserInput} placeholder="What's on your mind?" multiline={true} />

            <View style={{alignItems: 'flex-end'}}>
                <TouchableHighlight onPress={submitCreate} disabled={userInput.length === 0} activeOpacity={0.5} underlayColor="#459BB7" style={s.createBtn}>
                    <Text style={{fontFamily: 'opsLight', color: 'white'}}> Create </Text>
                </TouchableHighlight>
            </View>
        </View>
    )

}

const s = StyleSheet.create({
    root: {
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        // borderRadius: 5,
        // elevation: 3,
    },
    input: {
        // backgroundColor: 'whitesmoke',
        padding: 5,
        fontFamily: 'opsLight'
    },
    createBtn: {
        backgroundColor: celticB,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 3,
        width: 80,
    }
})
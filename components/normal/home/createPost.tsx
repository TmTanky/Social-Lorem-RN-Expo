import React, { useState, FC } from "react";
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import { useDispatch } from "react-redux";

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

    const [userInput, setUserInput] = useState("")

    const create = async () => {

        dispatch(createPost(token!, postBy!, userInput))
        setUserInput("")

    }

    return (
        <View style={s.root}>
            <Text style={{fontFamily: 'opsSemi', fontSize: 18, marginVertical: 5}}> Create Post </Text>
            <TextInput style={s.input} value={userInput} onChangeText={setUserInput} placeholder="What's on your mind?" multiline={true} />

            <View style={{alignItems: 'flex-end'}}>
                <TouchableHighlight onPress={create} disabled={userInput.length === 0} activeOpacity={0.5} underlayColor="#459BB7" style={s.createBtn}>
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
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },
    input: {
        // backgroundColor: 'whitesmoke',
        padding: 5,
        fontFamily: 'opsLight'
    },
    createBtn: {
        backgroundColor: "#3373C4",
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 3,
        width: 80,
    }
})
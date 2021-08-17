import React, { FC, Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { createComment } from '../../../redux/actions/actions'

// Types
import { Istate } from '../../../types/index'

interface Props {
    onClose: Dispatch<SetStateAction<boolean>>
    postID: string
}

export const CreateCommentComponent: FC<Props> = (props) => {

    const { onClose, postID } = props

    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)

    const [userInput, setUserInput] = useState("")

    return (
        <View style={{backgroundColor: 'white'}}>
            <Text style={{fontFamily: 'opsSemi', marginBottom: 20, fontSize: 20}} > Create a comment </Text>
            <TextInput value={userInput} onChangeText={setUserInput} multiline={true} placeholder="Write something." />

            <TouchableHighlight disabled={!userInput} activeOpacity={0.2} underlayColor="#3373C4" onPress={() => {
                dispatch(createComment(postID, userInput, userID!, token!))
                onClose(prev => !prev)
            }} style={s.btn}>
                <Text style={{fontFamily: 'opsSemi'}}> Comment </Text>
            </TouchableHighlight>
            
            <TouchableHighlight activeOpacity={0.2} underlayColor="red" onPress={() => {
                onClose(prev => !prev)
            }} style={s.btn2}>
                <Text style={{fontFamily: 'opsSemi'}}> Cancel </Text>
            </TouchableHighlight>
        </View>
    )

}

const s = StyleSheet.create({
    btn: {
        marginTop: 15,
        backgroundColor: "#3373C4",
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn2: {
        marginTop: 5,
        height: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
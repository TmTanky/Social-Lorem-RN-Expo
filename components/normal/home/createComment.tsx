import React, { FC, Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from 'react-redux'

// Constants
import { celticB, lightMode } from "../../../constants/Colors";

// Redux
import { createComment } from '../../../redux/actions/actions'

// Types
import { Istate } from '../../../types/index'

interface Props {
    onClose: Dispatch<SetStateAction<boolean>>
    postID: string,
    refetch?: Function
    refetchView?: Function
    otherProps: any
}

export const CreateCommentComponent: FC<Props> = (props) => {

    const { onClose, postID, refetchView } = props

    const route = useRoute()
    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)

    const [userInput, setUserInput] = useState("")

    return (
        <View style={{backgroundColor: 'transparent'}}>
            <Text style={{fontFamily: 'opsSemi', marginBottom: 20, fontSize: 20}} > Create a comment </Text>
            <TextInput value={userInput} style={{
                backgroundColor: 'transparent'
            }} onChangeText={setUserInput} multiline={true} placeholder="Write something." />

            <TouchableHighlight disabled={!userInput} activeOpacity={0.2} underlayColor={celticB} onPress={() => {
                dispatch(createComment(postID, userInput, userID!, token!, route.name))
                route.name === 'viewprofile' && refetchView ? refetchView!() : null 
                onClose(prev => !prev)
            }} style={s.btn}>
                <Text style={{fontFamily: 'opsSemi', color: lightMode}}> Comment </Text>
            </TouchableHighlight>
            
            <TouchableHighlight activeOpacity={0.2} underlayColor="red" onPress={() => {
                onClose(prev => !prev)
            }} style={s.btn2}>
                <Text style={{fontFamily: 'opsSemi', color: lightMode}}> Cancel </Text>
            </TouchableHighlight>
        </View>
    )

}

const s = StyleSheet.create({
    btn: {
        marginTop: 15,
        backgroundColor: celticB,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn2: {
        marginTop: 5,
        height: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
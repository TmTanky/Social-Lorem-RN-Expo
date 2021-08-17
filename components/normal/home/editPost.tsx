import React, { FC, Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

// Redux
import { editPost } from "../../../redux/actions/actions";

// Types
import { Ipost, Istate } from "../../../types";
interface Props {
    onClose: Dispatch<SetStateAction<boolean>>
    myPosts: Ipost[]
    selectedID: string
}

export const EditPostComponent: FC<Props> = (props) => {

    const { onClose, myPosts, selectedID } = props
    const dispatch = useDispatch()
    const userID = useSelector((state: Istate) => state.user._id)
    const token = useSelector((state: Istate) => state.user.token)
    const selectedPost = myPosts.find(item => item._id === selectedID)
    
    const [userInput, setUserInput] = useState(selectedPost?.content)

    return (
        <View style={{backgroundColor: 'white'}}>
            <Text style={{fontFamily: 'opsSemi', marginBottom: 20, fontSize: 20}}> Edit Post </Text>
            <TextInput value={userInput} placeholder="Write something." onChangeText={setUserInput} multiline={true} />

            <TouchableHighlight disabled={!userInput} activeOpacity={0.2} underlayColor="#3373C4" onPress={() => {
                dispatch(editPost(selectedID, userInput!, token!, userID!))
                onClose(prev => !prev)
            }} style={s.btn}>
                <Text style={{fontFamily: 'opsSemi'}}> Confirm </Text>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.2} underlayColor="red" style={s.btn2} onPress={() => onClose(prev => !prev)}>
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
        backgroundColor: 'red',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
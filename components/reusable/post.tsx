import React, { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";

// Types
import { Icomment, Iuser } from "../../types";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface Props {
    id: string
    comments: Icomment[]
    postBy: Iuser
    likes: Iuser[]
    content: string
    toggleOptions?: Dispatch<SetStateAction<boolean>>
    setDelete?: Dispatch<SetStateAction<string>>
}

export const PostItem: FC<Props> = (props) => {

    const { id, comments, postBy, likes, content, toggleOptions, setDelete } = props
    const nav = useNavigation()
    const route = useRoute()
    const [isHome, setIsHome] = useState<boolean>(true)
    // console.log(route.name)

    useEffect(() => {
        const subcribe = nav.addListener('focus', () => {
            route.name === "My Profile" ? setIsHome(false) : setIsHome(true)
        })

        return subcribe
    }, [route.name])


    return (
        <View style={s.post}>
            <View style={s.postBy}>
                <Text style={{fontFamily: 'opsSemi', fontSize: 18}}> {postBy.firstName} {postBy.lastName} </Text>
                { !isHome && <MaterialIcons onPress={() => {
                    setDelete!(id)
                    toggleOptions!(prev => !prev)
                }} name="more-horiz" size={25} /> }
            </View>

            <View>
                <Text style={{fontFamily: 'opsLight'}}> {content} </Text>
            </View>

            { (likes.length > 0 || comments.length > 0) && <View style={s.stats}>
                <View style={s.likeStat}>
                    <Text style={{fontFamily: 'opsLight'}}> Likes: {likes.length} </Text>
                </View>

                <View style={s.commentStat}>
                    <Text style={{fontFamily: 'opsLight', alignItems: 'center'}}> Comments: {comments.length} </Text>
                </View>
            </View> }

            <View style={s.options}>
                <View style={s.option}>
                    <MaterialIcons name="thumb-up-off-alt" color="#67B3C9" size={20} />
                </View>

                <View style={s.option}>
                    <MaterialIcons name="comment" color="#67B3C9" size={20} />
                </View>
            </View>
        </View>
    )

}

const s = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 3,
        elevation: 1.5
    },
    postBy: {
        marginBottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    stats: {
        flexDirection: 'row',
        marginTop: 10
    },
    likeStat: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 5
    },
    commentStat: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    options: {
        marginTop: 10,
        flexDirection: 'row',
        height: 25
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
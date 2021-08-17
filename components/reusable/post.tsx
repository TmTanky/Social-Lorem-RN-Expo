import React, { FC, useEffect, useState, SetStateAction, Dispatch } from "react";
import { Text, View, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { Overlay } from 'react-native-elements'

// Redux
import { reactToPost } from "../../redux/actions/actions";

// Types
import { Icomment, Iuser, Istate } from "../../types";

interface Props {
    id: string
    comments: Icomment[]
    postBy: Iuser
    likes: Iuser[]
    content: string
    toggleOptions?: Dispatch<SetStateAction<boolean>>
    setDelete?: Dispatch<SetStateAction<string>>
}

// Components 
import { CreateCommentComponent } from "../normal/home/createComment";

export const PostItem: FC<Props> = (props) => {

    const { id, comments, postBy, likes, content, toggleOptions, setDelete } = props

    const nav = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const myPosts = useSelector((state: Istate) => state.myPosts)
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)

    const [isHome, setIsHome] = useState<boolean>(true)
    const [showCreateComment, setShowCreateComment] = useState(false)

    useEffect(() => {
        const subcribe = nav.addListener('focus', () => {
            route.name === "MyProfile" ? setIsHome(false) : setIsHome(true)
        })

        return subcribe
    }, [route.name, myPosts])

    return (
        <View style={s.post}>
            <View style={s.postBy}>
                <Text style={{fontFamily: 'opsSemi', fontSize: 18}}> {postBy.firstName} {postBy.lastName} </Text>
                { !isHome && <Ionicons onPress={() => {
                    setDelete!(id)
                    toggleOptions!(prev => !prev)
                }} name="ellipsis-horizontal-outline" color="black" size={25} /> }
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
                    <Ionicons onPress={() => {
                        dispatch(reactToPost(id, userID!, token!))
                    }} name={ likes.map(item => item._id === id).length === 1 ? "heart" : "heart-outline" } color="#3373C4" size={20} />
                </View>

                <View style={s.option}>
                    <Ionicons onPress={() => setShowCreateComment(prev => !prev)} name="chatbox-ellipses-outline" color="#3373C4" size={20} />
                </View>
            </View>

            <Overlay animationType="fade" statusBarTranslucent={true} overlayStyle={{
                width: '90%',
                backgroundColor: 'white',
                paddingVertical: 20
            }} onRequestClose={() => setShowCreateComment(prev => !prev)} isVisible={showCreateComment} >
                <CreateCommentComponent postID={id} onClose={setShowCreateComment}/>
            </Overlay>

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
        elevation: 3
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
        marginTop: 15,
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
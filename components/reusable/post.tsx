import React, { FC, useEffect, useState, SetStateAction, Dispatch } from "react";
import { Text, View, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { Overlay } from 'react-native-elements'
import { useColorScheme } from "react-native-appearance";

// Redux
import { reactToPost } from "../../redux/actions/actions";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

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
    refetch?: Function
    otherProps?: any,
    refetchView?: Function
}

// Components 
import { CreateCommentComponent } from "../normal/home/createComment";

export const PostItem: FC<Props> = (props) => {

    const { id, comments, postBy, likes, content, toggleOptions, setDelete, refetch, otherProps, refetchView } = props

    const deviceTheme = useColorScheme()
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
        // const subcribe2 = nav.addListener('blur', () => {
        //     route.name === "MyProfile" ? setIsHome(false) : setIsHome(true)
        // })

        return () => {
            subcribe()
            // subcribe2()
        }
    }, [route.name, myPosts.length])

    return (
        <View style={{...s.post, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

            <View style={s.postBy}>
                <Text onPress={() => {
                    // otherProps.navigation.navigate('viewprofile', { id: postBy._id, username: postBy.username })
                    { postBy._id === userID ? 
                        otherProps.navigation.navigate('myprofiletab', { id: postBy._id, username: postBy.username }) :
                        otherProps.navigation.navigate('viewprofile', { id: postBy._id, username: postBy.username })
                    }
                }} style={{fontFamily: 'opsSemi', fontSize: 18, color: deviceTheme === 'light' ? darkMode : lightMode}}>
                    {postBy.firstName} {postBy.lastName}
                </Text>
                { !isHome && <Ionicons onPress={() => {
                    setDelete!(id)
                    toggleOptions!(prev => !prev)
                }} name="ellipsis-horizontal-outline" color={deviceTheme === 'light' ? darkMode : lightMode} size={25} /> }
            </View>

            <View>
                <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> {content} </Text>
            </View>

            { (likes.length > 0 || comments.length > 0) && <View style={s.stats}>
                <View style={s.likeStat}>
                    <Text onPress={() => {
                        otherProps.navigation.navigate('likesorcomments', { mode: 'Likes', id })
                    }} style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> Likes: {likes.length} </Text>
                </View>

                <View style={s.commentStat}>
                    <Text onPress={() => {
                        otherProps.navigation.navigate('likesorcomments', { mode: 'Comments', id })
                    }} style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode, alignItems: 'center'}}> Comments: {comments.length} </Text>
                </View>
            </View> }

            <View style={s.options}>
                <View style={s.option}>
                    <Ionicons onPress={() => {
                        dispatch(reactToPost(id, userID!, token!))
                        { refetch ? refetch() : null } 
                    }} name={ likes.filter(item => item._id === userID).length === 1 ? "heart" : "heart-outline" } color={celticB} size={20} />
                </View>

                <View style={s.option}>
                    <Ionicons onPress={() => setShowCreateComment(prev => !prev)} name="chatbox-ellipses-outline" color={celticB} size={20} />
                </View>
            </View>

            <Overlay animationType="fade" statusBarTranslucent={true} overlayStyle={{
                width: '90%',
                backgroundColor: 'white',
                paddingVertical: 20
            }} onRequestClose={() => setShowCreateComment(prev => !prev)} isVisible={showCreateComment} >
                <CreateCommentComponent otherProps={otherProps} refetchView={refetchView} refetch={refetch!} postID={id} onClose={setShowCreateComment}/>
            </Overlay>

        </View>
    )

}

const s = StyleSheet.create({
    post: {
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
import React, { useEffect, useState, FC } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Redux
import { loadAllPosts } from "../../redux/actions/actions";

// Types
import { Iuser, Istate } from "../../types";

// Components
import { CreatePostComponent } from "../../components/normal/home/createPost";
import { PostItem } from "../../components/reusable/post";

const HomeScreen: FC = (props) => {

    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const allPosts = useSelector((state: Istate) => state.homeFeed)

    useEffect(() => {
        dispatch(loadAllPosts(token!))
    }, [])

    return (
        <View>

            <CreatePostComponent/>

            <FlatList style={{paddingVertical: 20}} data={allPosts} keyExtractor={item => item._id} renderItem={(item) => {

                const {item: { _id, postBy, likes, comments, content }} = item

                return <PostItem id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

            }} />


        </View>
    )

}

export default HomeScreen

const Home = createNativeStackNavigator()

export const HomeStackNavigator = () => {

    const { Navigator, Screen } = Home 

    return (
        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#67B3C9"
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontFamily: 'opsBold'
            }
        }} >
            <Screen name="Home" component={HomeScreen} />
        </Navigator>
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
        marginBottom: 5
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
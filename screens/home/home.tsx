import React, { useEffect, useState, FC } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";

// Redux
import { loadAllPosts } from "../../redux/actions/actions";

// Types
import { Iuser, Istate } from "../../types";

// Components
import { CreatePostComponent } from "../../components/normal/home/createPost";
import { PostItem } from "../../components/reusable/post";

// Screens
import SearchScreen from "./search";

const HomeScreen: FC = (props) => {

    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const allPosts = useSelector((state: Istate) => state.homeFeed)

    useEffect(() => {
        dispatch(loadAllPosts(token!))
    }, [])

    return (
        <View style={s.mainRoot}>

            <CreatePostComponent/>

            <View style={s.outerStyle}>

                <FlatList style={s.listStyle} data={allPosts} keyExtractor={item => item._id} renderItem={(item) => {

                    const {item: { _id, postBy, likes, comments, content }} = item

                    return <PostItem id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

                }} />

            </View>


        </View>
    )

}

export default HomeScreen

const Home = createNativeStackNavigator()

export const HomeStackNavigator = () => {

    const { Navigator, Screen } = Home

    return (
        <Navigator screenOptions={() => {

            return {
                headerStyle: {
                    backgroundColor: 'white'
                },
                headerTintColor: '#202020',
                headerTitleStyle: {
                    fontFamily: 'opsBold'
                },
                animation: "slide_from_right",
                animationTypeForReplace: 'push'
            }

        }} >

            <Screen name="Home" options={(props) => {
                return {
                    headerRight: () => {
                        return <MaterialIcons name="search" color="black" onPress={() => props.navigation.navigate('Search')} size={25} />
                    }
                }
            }} component={HomeScreen} />

            <Screen name="Search" component={SearchScreen} />

        </Navigator>
    )

}

const s = StyleSheet.create({
    mainRoot: {
        backgroundColor: 'white',
        flex: 1
    },
    outerStyle: {
        paddingVertical: 10,
        backgroundColor: 'white',
        flex: 1
    },
    listStyle: {
        backgroundColor: 'white',
        flex: 1
    }
})
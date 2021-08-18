import React, { useEffect, useState, FC } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, useColorScheme } from 'react-native'
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
import ViewProfileScreen from "../globalScreens/viewProfile";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

const HomeScreen: FC = (props) => {

    const dispatch = useDispatch()
    const deviceTheme = useColorScheme()
    const token = useSelector((state: Istate) => state.user.token)
    const allPosts = useSelector((state: Istate) => state.homeFeed)

    useEffect(() => {
        dispatch(loadAllPosts(token!))
    }, [])

    return (
        <View style={{...s.mainRoot, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

            <CreatePostComponent/>

            <View style={{...s.outerStyle, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

                <FlatList style={{...s.listStyle, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}} data={allPosts} keyExtractor={item => item._id} renderItem={(item) => {

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
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={() => {

            return {
                headerStyle: {
                    backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                },
                headerTintColor: celticB,
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
                        return <MaterialIcons name="search" color={celticB} onPress={() => props.navigation.navigate('Search')} size={25} />
                    }
                }
            }} component={HomeScreen} />
            <Screen name="Search" component={SearchScreen} />
            <Screen name="ViewProfile" options={(props) => {

                const { id, username } = props.route.params as { id: string, username: string }

                return {
                    headerTitle: `@${username}`
                }
            }} component={ViewProfileScreen} />

        </Navigator>
    )

}

const s = StyleSheet.create({
    mainRoot: {
        backgroundColor: lightMode,
        flex: 1
    },
    outerStyle: {
        paddingVertical: 10,
        backgroundColor: lightMode,
        flex: 1
    },
    listStyle: {
        backgroundColor: lightMode,
        flex: 1
    }
})
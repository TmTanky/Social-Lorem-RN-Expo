import React, { useEffect, useState, FC } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, useColorScheme, Dimensions } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

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
import LikesOrCommentsScreen from "../globalScreens/likesOrComments";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

const HomeScreen: FC = (props) => {

    const dispatch = useDispatch()
    const deviceTheme = useColorScheme()
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)!
    const allPosts = useSelector((state: Istate) => state.homeFeed)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(loadAllPosts(token!))
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
    }, [])

    return (
        <View style={{...s.mainRoot, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

            <View style={{...s.outerStyle, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

                <FlatList ListHeaderComponent={
                    <View>

                        <CreatePostComponent token={token} postBy={userID}/>

                        { isLoading ? [1,2,3,4,5].map((key) => {
                        return (
                            <View style={{justifyContent: 'center', alignItems: 'center'}} key={key}>
                                <ContentLoader 
                                    speed={1.5}
                                    width={Dimensions.get('screen').width - 40}
                                    height={150}
                                    viewBox="0 0 400 160"
                                    backgroundColor={deviceTheme === 'light' ? lightMode : celticB}
                                    foregroundColor={deviceTheme === 'light' ? celticB : lightMode}
                                    animate={true}
                                    style={{justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Rect x="0" y="8" rx="3" ry="3" width="150" height="5" /> 
                                    <Rect x="0" y="26" rx="3" ry="3" width="220" height="5" /> 
                                    <Rect x="0" y="56" rx="3" ry="3" width="410" height="5" /> 
                                    <Rect x="0" y="72" rx="3" ry="3" width="380" height="5" /> 
                                    <Rect x="0" y="88" rx="3" ry="3" width="178" height="5" />
                                </ContentLoader>
                            </View>
                            )
                        }) : null }

                        { allPosts.length === 0 && !isLoading ? <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'opsSemi', color: 'gray'}}> No Posts Available </Text>
                        </View> : null }

                    </View>
                } style={{...s.listStyle, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}} data={allPosts} keyExtractor={item => item._id} renderItem={(item) => {

                    const {item: { _id, postBy, likes, comments, content }} = item

                    return <PostItem otherProps={props} id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

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
            <Screen name="LikesOrComments" options={(props) => {

                const { mode } = props.route.params as { mode: string }

                return {
                    headerTitle: mode,
                    animation: "simple_push"
                }
            }} component={LikesOrCommentsScreen} />

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
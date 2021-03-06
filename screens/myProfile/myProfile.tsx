import React, { useEffect, useState, FC } from "react";
import { View, Text, FlatList, StyleSheet, TouchableHighlight, useColorScheme, Dimensions, ToastAndroid } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-native-elements";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import ContentLoader, { Rect } from "react-content-loader/native"

// Types
import { Istate } from "../../types";

// Redux
import { getFollow, getUsername, deletePost, loadAllPosts, paginate } from "../../redux/actions/actions";

// Helpers
import { optionsBtns } from "../../helpers/bottomSheetOptions";

// Screens
import { SettingsNavigator } from "../settings/settings";

// Components
import { PostItem } from "../../components/reusable/post";
import { CreatePostComponent } from "../../components/normal/home/createPost";
import { EditPostComponent } from "../../components/normal/home/editPost";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";


const MyProfileScreen: FC = (props: any) => {

    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)
    const username = useSelector((state: Istate) => state.names.username)
    const fName = useSelector((state: Istate) => state.names.firstName)
    const lName = useSelector((state: Istate) => state.names.lastName)
    const following = useSelector((state: Istate) => state.follow.following)
    const followers = useSelector((state: Istate) => state.follow.followers)
    const myPosts = useSelector((state: Istate) => state.myPosts)
    const deviceTheme = useColorScheme()

    const [refreshing, setRefreshing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [showEditPost, setShowEditPost] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState("")
    const [limitCount, setLimitCount] = useState(5)
    const [skipCount] = useState(0)
    const [toBeEdited, setToBeEdited] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    const handler = (mode: string, postID: string) => {

        switch (mode) {

            case 'Edit':
                setShowEditPost(true)
                setToBeEdited(postID)
                setIsOpen(prev => !prev)
                return 
            case 'Remove':
                const deleteHandler = async () => dispatch(deletePost(token!, postID!, userID!)) as unknown
                const finalHandler = async () => {
                    deleteHandler().then(res => {
                        res === 'Successfully Deleted' && ToastAndroid.showWithGravity('Successfully Deleted', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                        dispatch(loadAllPosts(token!))
                        setToBeDeleted("")
                        // setIsOpen(prev => !prev)
                        return 
                    }).catch(err => {
                        return err === 'Failed' && ToastAndroid.showWithGravity('Please try again', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    })
                }

                finalHandler()
            case 'Cancel':
                setToBeDeleted("")
                setToBeEdited("")
                setIsOpen(prev => !prev)
                return
            default:
                return null

        }

    }

    const iconHandler = (mode: string) => {

        switch (mode) {
            case 'Edit':
                return <Ionicons name="pencil-outline" color={deviceTheme === 'light' ? lightMode : darkMode} size={22} />
            case 'Remove':
                return <Ionicons name="trash-outline" color={deviceTheme === 'light' ? lightMode : darkMode} size={22} />
            case 'Cancel':
                return <Ionicons name="close-outline" color={deviceTheme === 'light' ? lightMode : darkMode} size={22} />
            default:
                return null
        }

    }

    useEffect(() => {
        setRefreshing(true)
        dispatch(getUsername(token!, userID!))
        dispatch(getFollow(token!, userID!))

        const pepe = async () => {
            const tae = dispatch(paginate(token!, userID!, limitCount, skipCount)) as unknown
            return tae as boolean
        }

        pepe().then(puday => {
            puday === true && setRefreshing(false)
            setIsLoading(false)
        }).then(err => {
            return 
        })

    }, [limitCount])

    return (
        <View style={{...s.root, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

            <FlatList style={{
                backgroundColor: deviceTheme === 'light' ? lightMode : darkMode,
                flex: 1
            }} ListHeaderComponent={
                <View style={{paddingVertical: 15}}>

                    <View style={{...s.profileRoot, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>

                        <View style={{paddingVertical: 10}}>
                            <Text style={{fontFamily: 'opsBold', fontSize: 22, color: deviceTheme === 'light' ? darkMode : lightMode}}>
                                { isLoading ? 'Loading...' : !fName || !lName ? 'Loading...' : `${fName} ${lName}` }
                            </Text>
                            <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}>
                                { isLoading ? 'Loading...' : `@${username}` }
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text onPress={() => {
                                props.navigation.navigate('followingorfollowers', { mode: 'Following', userID })
                            }} style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> Following: {following?.length} </Text>
                            <Text onPress={() => {
                                props.navigation.navigate('followingorfollowers', { mode: 'Followers', userID })
                            }} style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> Followers: {followers?.length} </Text>
                        </View>

                    </View>

                    <CreatePostComponent token={token} postBy={userID} />

                    { isLoading ? [1,2,3].map((key) => {
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

                    { myPosts.length === 0 && !isLoading ? <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'opsSemi', color: 'gray'}}> No Posts Available </Text>
                    </View> : null }

                </View>
            } data={myPosts} keyExtractor={item => item._id} renderItem={(item) => {

                const {item: { _id, postBy, likes, comments, content }} = item

                return <PostItem otherProps={props} setDelete={setToBeDeleted} toggleOptions={setIsOpen} id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

            }} refreshing={refreshing} indicatorStyle="black" onRefresh={() => {
                setLimitCount(5)
            }} onEndReached={() => {
                setLimitCount(prev => prev+=5)
            }} onEndReachedThreshold={0.1} />

            {/* Post Options */}
            <BottomSheet containerStyle={{
                backgroundColor: 'transparent'
            }} isVisible={isOpen}>
                { optionsBtns.map(item => {
                    return (
                        <TouchableHighlight activeOpacity={0.1} underlayColor={deviceTheme === 'light' ? darkMode : lightMode} key={item.id} onPress={() => {
                             handler(item.title, toBeDeleted)
                        }} style={{...s.optionBtns, backgroundColor: deviceTheme === 'light' ? darkMode : lightMode}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                { iconHandler(item.title) }
                                <Text style={{fontFamily: 'opsReg', marginLeft: 8, color: deviceTheme === 'light' ? lightMode : darkMode}}> {item.title} </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }) }
            </BottomSheet>

            <Overlay animationType="fade" statusBarTranslucent={true} overlayStyle={{
                width: '90%',
                backgroundColor: deviceTheme === 'light' ? darkMode : lightMode,
                paddingVertical: 20
            }} isVisible={showEditPost} >
                <EditPostComponent selectedID={toBeEdited} myPosts={myPosts} onClose={setShowEditPost}/>
            </Overlay>

        </View>
    )

}

export default MyProfileScreen

const MyProfile = createNativeStackNavigator()

export const MyProfileStackNavigator = () => {

    const { Navigator, Screen } = MyProfile
    const deviceTheme = useColorScheme()

    return (
        <Navigator screenOptions={options}>

            <Screen name="MyProfile" options={(props) => {
                return {
                    headerTitle: 'My Profile',
                    headerRight: () => {
                        return <Ionicons onPress={() => {
                            props.navigation.navigate('Settings')
                        }} name="person-circle-outline" color={celticB} size={30} />
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                    }
                }
            }} component={MyProfileScreen} />

            <Screen name="Settings" options={{
                animation: "slide_from_right",
                headerStyle: {
                    backgroundColor: deviceTheme === 'light' ? lightMode : darkMode
                }
            }} component={SettingsNavigator} />

        </Navigator>
    )

}

const s = StyleSheet.create({
    root: {
        paddingBottom: 10,
        // backgroundColor: 'white',
        flex: 1
    },
    profileRoot: {
        // backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 5,
        // marginTop: 10,
        // borderRadius: 5,
        // elevation: 5,
    },
    optionBtns: {
        padding: 20,
        backgroundColor: 'whitesmoke'
        // borderRadius: 20
    }
})

const options = {
    headerStyle: {
        backgroundColor: "white"
    },
    headerTintColor: celticB,
    headerTitleStyle: {
        fontFamily: 'opsBold',
    },
    headerShown: false
}
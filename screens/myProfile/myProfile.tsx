import React, { useEffect, useState, FC } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { Istate } from "../../types";

// Redux
import { getFollow, getUsername, getUsersPosts, deletePost, loadAllPosts } from "../../redux/actions/actions";

// Helpers
import { optionsBtns } from "../../helpers/bottomSheetOptions";

// Components
import { PostItem } from "../../components/reusable/post";
import { CreatePostComponent } from "../../components/normal/home/createPost";

const MyProfileScreen: FC = (props) => {

    const dispatch = useDispatch()
    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)
    const username = useSelector((state: Istate) => state.names.username)
    const fName = useSelector((state: Istate) => state.names.firstName)
    const lName = useSelector((state: Istate) => state.names.lastName)
    const following = useSelector((state: Istate) => state.follow.following)
    const followers = useSelector((state: Istate) => state.follow.followers)
    const myPosts = useSelector((state: Istate) => state.myPosts)

    console.log(myPosts.length)

    const [isOpen, setIsOpen] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState("")

    const handler = (mode: string, postID: string) => {

        switch (mode) {

            case 'Edit':
                return null
            case 'Remove':
                dispatch(deletePost(token!, postID!, userID!))
                dispatch(loadAllPosts(token!))
                setToBeDeleted("")
                setIsOpen(prev => !prev)
                // console.log('tae')
                return 
                // return console.log(postID)
            case 'Cancel':
                setToBeDeleted("")
                setIsOpen(prev => !prev)
                return
            default:
                return null

        }

    }

    useEffect(() => {
        dispatch(getUsername(token!, userID!))
        dispatch(getFollow(token!, userID!))
        dispatch(getUsersPosts(token!, userID!))
    }, [])

    return (
        <View>

            {/* <View style={s.profileRoot}>
                <View style={{paddingVertical: 10}}>
                    <Text style={{fontFamily: 'opsBold', fontSize: 22}}> {`${fName} ${lName}`} </Text>
                    <Text style={{fontFamily: 'opsLight'}}> @{username} {toBeDeleted} </Text>
                </View>

                <View>
                    <Text style={{fontFamily: 'opsLight'}}> Following: {following?.length} </Text>
                    <Text style={{fontFamily: 'opsLight'}}> Followers: {followers?.length} </Text>
                </View>
            </View> */}

            {/* <CreatePostComponent token={token} postBy={userID} /> */}

            <FlatList style={{paddingTop: 20}} data={myPosts} keyExtractor={item => item._id} renderItem={(item) => {

                const {item: { _id, postBy, likes, comments, content }} = item

                return <PostItem setDelete={setToBeDeleted} toggleOptions={setIsOpen} id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

            }} />

            {/* <BottomSheet containerStyle={{
                backgroundColor: 'transparent'
            }} isVisible={isOpen}>
                { optionsBtns.map(item => {
                    return (
                        <TouchableHighlight key={item.id} onPress={() => {
                            //  item.title === 'Cancel' ? setIsOpen(prev => !prev) : null
                             handler(item.title, toBeDeleted)
                        }} style={s.optionBtns}>
                            <Text style={{fontFamily: 'opsReg'}}> {item.title} </Text>
                        </TouchableHighlight>
                    )
                }) }
            </BottomSheet> */}

        </View>
    )

    // return (

    //     <FlatList ListHeaderComponent={
    //         <View>
    //             <View style={s.profileRoot}>
    //                 <View style={{paddingVertical: 10}}>
    //                     <Text style={{fontFamily: 'opsBold', fontSize: 22}}> {`${fName} ${lName}`} </Text>
    //                     <Text style={{fontFamily: 'opsLight'}}> @{username} {toBeDeleted} </Text>
    //                 </View>

    //                 <View>
    //                     <Text style={{fontFamily: 'opsLight'}}> Following: {following?.length} </Text>
    //                     <Text style={{fontFamily: 'opsLight'}}> Followers: {followers?.length} </Text>
    //                 </View>
    //             </View>

    //             <CreatePostComponent token={token} postBy={userID} />
    //         </View> 
    //     } ListHeaderComponentStyle={{
    //         backgroundColor: 'red'
    //     }} style={{paddingTop: 20}} data={myPosts} keyExtractor={item => item._id} renderItem={(item) => {

    //         const {item: { _id, postBy, likes, comments, content }} = item

    //         return <PostItem setDelete={setToBeDeleted} toggleOptions={setIsOpen} id={_id} postBy={postBy} likes={likes} comments={comments} content={content} />

    //     }} />

    // )

}

export default MyProfileScreen

const MyProfile = createNativeStackNavigator()

export const MyProfileStackNavigator = () => {

    const { Navigator, Screen } = MyProfile

    return (
        <Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#006992",
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontFamily: 'opsBold',
            }
        }}>
            <Screen name="My Profile" component={MyProfileScreen} />
        </Navigator>
    )

}

const s = StyleSheet.create({
    profileRoot: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        elevation: 1.5,
    },
    optionBtns: {
        padding: 20,
        backgroundColor: 'whitesmoke'
        // borderRadius: 20
    }
})
import React, { useEffect, FC, useState } from "react";
import { View, Text, FlatList, useColorScheme, ActivityIndicator } from 'react-native'
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useSelector } from "react-redux";

// Classes
import { LikeClass } from "../../classes/like";
import { CommentClass } from "../../classes/comment";

// Types
import { Icomment, Istate, ILikes } from "../../types";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Gql
import { viewCommentsGql, viewLikesGql } from "../../gql/queries";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

const LikesOrCommentsScreen: FC = (props: any) => {

    const route = useRoute()
    const { mode, id } = route.params as { mode: string, id: string }

    const token = useSelector((state: Istate) => state.user.token)
    const userID = useSelector((state: Istate) => state.user._id)!
    const deviceTheme = useColorScheme()

    const [likesData, setLikesData] = useState<LikeClass[]>()
    const [commentsData, setCommentsData] = useState<CommentClass[]>()
    // const [isLoading, setIsLoading] = useState(true)

    const viewLikes = async () => {
        
        try {

            const {data} = await axios.post(PROD_URL, {
                query: viewLikesGql,
                variables: {
                    postID: id
                }
            }, { headers: { 'authorization': `Bearer ${token}` } })

            // console.log(data.data.viewLikes.likes)
            const allData = data.data.viewLikes.likes as ILikes[]

            const convertedData = allData.map(item => new LikeClass(item._id!, item.username!, item.firstName!, item.lastName!))
            setLikesData(convertedData)
            // setIsLoading(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    const viewComments = async () => {
        
        try {

            const {data} = await axios.post(PROD_URL, {
                query: viewCommentsGql,
                variables: {
                    postID: id
                }
            }, { headers: { 'authorization': `Bearer ${token}` } })

            const allData = data.data.viewPostComments as Icomment[]

            const convertedData = allData.map(item => new CommentClass(item._id!, item.content!, item.commentBy!))
            setCommentsData(convertedData)
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        
        mode === 'Likes' ? viewLikes() : viewComments()

    }, [])

    return (
        <View style={{backgroundColor: deviceTheme === 'light' ? lightMode : darkMode, flex: 1, paddingTop: 20}}>
            { mode === 'Likes' ? <FlatList ListHeaderComponent={
                <View>
                    { !likesData ? <ActivityIndicator color={celticB} size="large" /> : null }
                    { likesData && likesData.length <= 0 ? <Text style={{
                        fontFamily: 'opsSemi',
                        color: deviceTheme === 'light' ? darkMode : lightMode,
                        textAlign: 'center'
                    }}> No Likes </Text> : null  }
                </View>
            } data={likesData} keyExtractor={item => item._id!} renderItem={itemData => {

                const { item } = itemData 

                return (
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text onPress={() => {
                            item._id === userID ? props.navigation.navigate('myprofiletab') : 
                            props.navigation.navigate('viewprofile', { id: item._id, username: item.username })
                        }} style={{fontFamily: 'opsSemi', color: deviceTheme === 'light' ? darkMode : lightMode, fontSize: 18}}> {item.fullName()} </Text>
                    </View>
                )

            }} /> : <FlatList ListHeaderComponent={
                        <View>
                            { !commentsData ? <ActivityIndicator color={celticB} size="large" /> : null }
                            { commentsData && commentsData.length <= 0 ? <Text style={{
                                fontFamily: 'opsSemi',
                                color: deviceTheme === 'light' ? darkMode : lightMode,
                                textAlign: 'center'
                            }}> No Comments </Text> : null  }
                        </View>

                    } data={commentsData} keyExtractor={item => item._id!} renderItem={itemData => {

                        const { item } = itemData 
            
                        return (
                            <View style={{marginHorizontal: 20, marginTop: 10}}>
                                <Text onPress={() => {
                                    item.commentBy._id === userID ? props.navigation.navigate('myprofiletab') : 
                                    props.navigation.navigate('viewprofile', { id: item.commentBy._id, username: item.commentBy.username })
                                }} style={{fontFamily: 'opsSemi', color: deviceTheme === 'light' ? darkMode : lightMode, marginBottom: 10, fontSize: 18}}> {item.fullName()} </Text>
                                <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> {item.content} </Text>
                            </View>
                        )
            
                    }} /> }
        </View>
    )

}

export default LikesOrCommentsScreen
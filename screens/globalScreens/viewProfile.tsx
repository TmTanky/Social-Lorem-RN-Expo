import React, { useEffect, useState, FC } from "react";
import { View, FlatList, useColorScheme, Dimensions } from 'react-native'
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";
import ContentLoader, { Rect } from "react-content-loader/native"

// Types
import { Ipost, Istate, Iuser } from "../../types";

// Gql
import { paginateGql, viewUserGql } from "../../gql/queries";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Constants
import { lightMode, darkMode, celticB } from "../../constants/Colors";

// Components
import { PostItem } from "../../components/reusable/post";
// const ProfileInfo = lazy(() => import('../../components/viewUser/profile'))
import Profile from "../../components/viewUser/profile";

const ViewProfileScreen: FC = (props: any) => {

    const cancelToken = axios.CancelToken.source()
    const cancelToken2 = axios.CancelToken.source()

    const route = useRoute()
    const token = useSelector((state: Istate) => state.user.token)!
    const deviceTheme = useColorScheme()

    const { id: routeID } = route.params as {username: string, id: string}

    const [viewedUser, setViewedUser] = useState<Iuser>()
    const [usersPosts, setUsersPosts] = useState<Ipost[]>()
    const [refreshing, setRefreshing] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)
    const [limitCount, setLimitCount] = useState(5)
    const [skipCount] = useState(0)
    // const [isMounted, setIsMounted] = useState(true)
    
    const getUsername = async () => {

        setRefreshing(true)
        const { username } = route.params as {username: string, id: string}

        const {data} = await axios.post<{data: { viewUser: Iuser } }>(PROD_URL, {
            query: viewUserGql,
            variables: {
                username
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            },
            cancelToken: cancelToken.token
        })

        setViewedUser(data.data.viewUser)
        await getUsersPosts()

    }

    const getUsersPosts = async () => {

        const { id } = route.params as {username: string, id: string}

        const {data} = await axios.post<{data: { paginate: Ipost[] } }>(PROD_URL, {
            query: paginateGql,
            variables: {
                userID: id,
                limitCount,
                skipCount
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            },
            cancelToken: cancelToken2.token
        })

        setUsersPosts(data.data.paginate)
        setRefreshing(false)
        // setIsLoading(false)

    }

    useEffect(() => {
        getUsername()
    }, [limitCount, routeID])

    return (
        <FlatList style={{flex: 1, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}} ListHeaderComponent={
            <View style={{marginVertical: 20}}>
                <Profile
                    fName={viewedUser?.firstName!}
                    lName={viewedUser?.lastName!}
                    uName={viewedUser?.username!}
                    following={viewedUser?.following!}
                    followers={viewedUser?.followers!}
                    // isLoading={isLoading}
                    personID={viewedUser?._id!}
                    getUsername={getUsername}
                    getUsersPosts={getUsersPosts}
                    otherProps={props}
                />
                { !viewedUser ? [1,2,3,4,5].map((key) => {
                    return (
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}} key={key}>
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
            </View> } data={usersPosts} keyExtractor={item => item._id} renderItem={(data) => {

                const { item } = data

                return <PostItem
                    otherProps={props}
                    comments={item.comments}
                    content={item.content}
                    id={item._id}
                    postBy={item.postBy}
                    likes={item.likes}
                    refetchView={getUsersPosts}
                />

            }} refreshing={refreshing} indicatorStyle="black" onRefresh={() => {
                setLimitCount(5)
            }} onEndReached={() => {
                setLimitCount(prev => prev+=5)
            }} onEndReachedThreshold={0.1} />
    )

}

export default ViewProfileScreen
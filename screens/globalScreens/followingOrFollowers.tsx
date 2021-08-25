import React, { useState, useEffect, FC } from "react";
import { View, Text, useColorScheme, FlatList } from 'react-native'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useRoute } from "@react-navigation/core";

// Types
import { Iuser, Istate } from "../../types";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Gql
import { getFollowGql } from "../../gql/queries";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";

const FollowingOrFollowersScreen: FC = (props: any) => {

    const route = useRoute()
    const deviceTheme = useColorScheme()
    const { userID, mode } = route.params as { userID: string, mode: string }

    const token = useSelector((state: Istate) => state.user.token)!

    const [data, setData] = useState<{following: Iuser[], followers: Iuser[]}>()

    const getFollowData = async () => {

        const {data} = await axios.post(PROD_URL, {
            query: getFollowGql,
            variables: {
                userID
            }
        }, {
            headers: {
                'authorization' : `Bearer ${token}`
            }
        })

        setData(data.data.getFollow)

    }

    useEffect(() => {
        getFollowData()
    }, [])

    if (!data?.following && !data?.followers) {
        return <View style={{backgroundColor: deviceTheme === 'light' ? lightMode : darkMode , flex: 1}}>
            <ActivityIndicator style={{paddingTop: 50}} color={celticB} size="small" />
        </View>
    }

    return (
        mode === 'Following' ? <FlatList
            style={{
                backgroundColor: deviceTheme === 'light' ? lightMode : darkMode , flex: 1,
                padding: 20
            }}
            data={data!.following}
            keyExtractor={item => item._id!}
            renderItem={itemData => {
                const { item: { firstName, lastName, _id, username } } = itemData

                return (
                    <View>
                        <Text onPress={() => {
                            props.navigation.navigate('viewprofile', { id: _id, username })
                        }} style={{
                            color: deviceTheme === 'light' ? darkMode : lightMode,
                            fontFamily: 'opsReg',
                            fontSize: 18
                        }}> {firstName} {lastName} </Text>
                    </View>
                )
        }} ListHeaderComponent={
            <View>
                { data.following.length <= 0 && <Text style={{
                    color: deviceTheme === 'light' ? darkMode : lightMode,
                    fontFamily: 'opsReg',
                    fontSize: 15,
                    textAlign: 'center'
                }}> No Following </Text> }
            </View>
        } /> : <FlatList
                    style={{
                        backgroundColor: deviceTheme === 'light' ? lightMode : darkMode , flex: 1,
                        padding: 20
                    }}
                    data={data!.followers}
                    keyExtractor={item => item._id!}
                    renderItem={itemData => {
                        const { item: { firstName, lastName, _id, username } } = itemData

                        return (
                            <View>
                                <Text onPress={() => {
                                    props.navigation.navigate('viewprofile', { id: _id, username })
                                }} style={{
                                    color: deviceTheme === 'light' ? darkMode : lightMode,
                                    fontFamily: 'opsReg',
                                    fontSize: 18
                                }}> {firstName} {lastName} </Text>
                            </View>
                        )
                }} ListHeaderComponent={
                    <View>
                        { data.followers.length <= 0 && <Text style={{
                            color: deviceTheme === 'light' ? darkMode : lightMode,
                            fontFamily: 'opsReg',
                            fontSize: 15,
                            textAlign: 'center'
                        }}> No Followers </Text> }
                    </View>
                } />
    )

}

export default FollowingOrFollowersScreen
import React, { useEffect, Suspense, lazy } from "react";
import { View, Text } from 'react-native'
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import { useSelector } from "react-redux";

// Types
import { Istate } from "../../types";

// Gql
import { getUserByUsernameGql } from "../../gql/queries";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Components
const Tubol = lazy(() => import('../../components/sample/tubol'))

const ViewProfileScreen = () => {

    const route = useRoute()
    const token = useSelector((state: Istate) => state.user.token)!
    
    const getUsername = async () => {

        const { username} = route.params as {username: string, id: string}

        const {data} = await axios.post(PROD_URL, {
            query: getUserByUsernameGql,
            variables: {
                username 
            }
        }, { headers: {
            'authorization': `Bearer ${token}`
        }})

        console.log(data)

    }

    useEffect(() => {
        getUsername()
    }, [])

    return (
        <View>
            <Text> Yawa </Text>
            <Suspense fallback={<View> <Text> Loading... </Text> </View>}>
                <Tubol/>
            </Suspense>
        </View>
    )

}

export default ViewProfileScreen
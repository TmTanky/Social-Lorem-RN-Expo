import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableHighlight, useColorScheme, Dimensions } from 'react-native'
import ContentLoader, { Rect } from "react-content-loader/native";
import { useSelector } from "react-redux";
import axios from "axios";

// Constants
import { celticB, darkMode, lightMode } from "../../constants/Colors";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Types
import { Istate, Iuser } from '../../types/index'
import { followUserGql } from "../../gql/mutations";

type Props = {
    fName: string
    lName: string
    uName: string
    following: Iuser[]
    followers: Iuser[]
    isLoading: boolean
    personID: string
    getUsername: Function
    getUsersPosts: Function
}

const Profile: FC<Props> = (props) => {

    const { fName, lName, uName, followers, following, isLoading, personID, getUsername, getUsersPosts } = props

    const deviceTheme = useColorScheme()
    const token = useSelector((state: Istate) => state.user.token)!
    const userID = useSelector((state: Istate) => state.user._id)!

    const followHandler = async (toFollowID: string) => {

        const {data} = await axios.post(PROD_URL, {
            query: followUserGql,
            variables: {
                userID,
                toFollowID
            }
        }, { headers: {
            'authorization': `Bearer ${token}`
        } })

        await getUsername()

    }

    return (
        <View style={{...s.root, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}}>
            <View style={s.info}>
                <View style={s.names}>
                    
                    { isLoading ? <ContentLoader 
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
                        <Rect x="0" y="60" rx="3" ry="3" width="100" height="5" /> 
                        <Rect x="0" y="74" rx="3" ry="3" width="140" height="5" /> 
                    </ContentLoader> : 
                    <View>
                        <Text style={{fontFamily: 'opsBold', fontSize: 20, color: deviceTheme === 'light' ? darkMode : lightMode}}> {fName} {lName} </Text>
                        <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}> @{uName} </Text>
                    </View> }

                </View>

                { isLoading ? null : <View style={s.status}>
                    <TouchableHighlight onPress={() => {
                        followHandler(personID)
                    }} style={{...s.statusBtn,
                        backgroundColor: followers.find(item => item._id === userID) ? celticB : 'transparent',
                        borderWidth: followers.find(item => item._id === userID) ? 0 : 1}}
                    >
                        <Text style={{fontFamily: 'opsReg', color: followers.find(item => item._id === userID) ? lightMode : celticB}}>
                            { followers.find(item => item._id === userID) ? 'Unfollow' : 'Follow' }
                        </Text>
                    </TouchableHighlight>
                </View> }
                
            </View>

            { isLoading ? null : <View style={{marginTop: 10}}>
                <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}>
                    Following: {following.length}
                </Text>
                <Text style={{fontFamily: 'opsLight', color: deviceTheme === 'light' ? darkMode : lightMode}}>
                    Followers: {followers.length} 
                </Text>
            </View> }
            
        </View>
    )

}

export default Profile

const s = StyleSheet.create({
    root: {
        // flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20
    },
    info: {
        // backgroundColor: 'yellow',
        // flex: 1,
        flexDirection: 'row'
    },
    names: {
        flex: 1,
        // backgroundColor: 'orange',
    },
    status: {
        flex: 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    statusBtn: {
        // backgroundColor: 'red',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 25,
        borderColor: celticB,
    }
})
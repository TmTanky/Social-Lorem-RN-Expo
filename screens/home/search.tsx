import React, { useState, useEffect, useRef, FC } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableHighlight, useColorScheme } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Gql
import { getUserByUsernameGql } from "../../gql/queries";

// Types
import { Istate, Iuser } from "../../types";

// Constants
import { darkMode, lightMode } from "../../constants/Colors";

const SearchScreen: FC = (props: any) => {

    const userID = useSelector((state: Istate) => state.user._id)!
    const token = useSelector((state: Istate) => state.user.token)
    const deviceTheme = useColorScheme()

    const [userInput, setUserInput] = useState("")
    const [userList, setUserList] = useState<Iuser[]>([])
    const [isSearching, setIsSearching] = useState<boolean | string>('idle')

    const submitSearch = async () => {

        const data = await axios.post(PROD_URL, {
            query: getUserByUsernameGql,
            variables: {
                username: userInput
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        setUserList(data.data.data.getUserByUsername)
        setIsSearching(false)

    }

    useEffect(() => {

        userInput.length > 0 && userInput !== 'idle' ? setIsSearching(true) : null
        const setting = setUserList([])

        const delaySearch = setTimeout(() => {
            submitSearch()
        }, 2000)

        return () => {
            clearTimeout(delaySearch)
            setting
        }
    }, [userInput])

    return (
        <View style={{backgroundColor: deviceTheme === 'light' ? lightMode : darkMode, flex: 1}}>

            <View style={{flexDirection: 'row', height: 60, paddingHorizontal: 10}}>
                <View style={{width: '90%', justifyContent: 'center', padding: 10}}>
                    <TextInput placeholderTextColor={deviceTheme === 'light' ? darkMode : lightMode} value={userInput}
                        onChangeText={setUserInput} autoFocus={false}
                        placeholder="Search something." returnKeyType="done"
                        style={{fontFamily: 'opsReg', fontSize: 15, color: deviceTheme === 'light' ? darkMode : lightMode}}
                    />
                </View>
                <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
                    { userInput ? <MaterialIcons onPress={() => {
                        setUserList([])
                        setUserInput("")
                        setIsSearching('idle')
                    }} name="close" color={deviceTheme === 'light' ? darkMode : lightMode} size={25} /> : null }
                </View>
            </View>

            <View style={{paddingHorizontal: 10}}>

                { isSearching === true && <ActivityIndicator style={{marginTop: 20}} color="#67B3C9" size="large" /> }

                { isSearching === false && userList.length === 0 && <View style={{marginTop: 20}}>
                    <Text style={{fontFamily: 'opsReg', textAlign: 'center', color: deviceTheme === 'light' ? darkMode : lightMode}}> No results </Text>
                </View> }

                { userList.map(item => {
                    return (
                        <TouchableHighlight onPress={() => {
                            console.log(item.username)
                            { item._id === userID ? 
                                props.navigation.navigate('MyProfile', { id: item._id, username: item.username }) :
                                props.navigation.navigate('ViewProfile', { id: item._id, username: item.username })
                            }
                        }} underlayColor="transparent" key={item._id}>
                            <View style={{paddingHorizontal: 10, paddingVertical: 8, backgroundColor: deviceTheme === 'light' ? lightMode : darkMode}} >
                                <Text style={{fontFamily: 'opsSemi', fontSize: 18, color: deviceTheme === 'light' ? darkMode : lightMode}}> {item.firstName} {item.lastName} </Text>
                                <Text style={{fontFamily: 'opsLight', fontSize: 13, color: deviceTheme === 'light' ? darkMode : lightMode}}> @{item.username} </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }) }
            </View>

        </View>
    )

}

export default SearchScreen
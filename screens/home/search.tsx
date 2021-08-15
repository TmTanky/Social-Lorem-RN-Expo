import React, { useState, useEffect, useRef, FC } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

// Helpers
import { PROD_URL } from "../../helpers/url";

// Gql
import { getUserByUsernameGql } from "../../gql/queries";

// Types
import { Istate, Iuser } from "../../types";

const SearchScreen: FC = (props: any) => {

    const token = useSelector((state: Istate) => state.user.token)

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

        // console.log(data.data.data.getUserByUsername)
        setUserList(data.data.data.getUserByUsername)
        setIsSearching(false)

    }

    useEffect(() => {

        userInput && setIsSearching(true)
        setUserList([])

        const delaySearch = setTimeout(() => {
            submitSearch()
        }, 2000)

        return () => {
            clearTimeout(delaySearch)
        }
    }, [userInput])

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>

            <View style={{flexDirection: 'row', height: 60, paddingHorizontal: 10}}>
                <View style={{width: '90%', justifyContent: 'center', padding: 10}}>
                    <TextInput value={userInput} onChangeText={setUserInput} autoFocus={false} placeholder="Search something." returnKeyType="done" style={{fontFamily: 'opsSemi', fontSize: 15}} />
                </View>
                <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
                    { userInput ? <MaterialIcons onPress={() => {
                        setUserList([])
                        setUserInput("")
                        setIsSearching('idle')
                    }} name="close" size={25} /> : null }
                </View>
            </View>

            <View style={{paddingHorizontal: 10}}>

                { isSearching === true && <ActivityIndicator style={{marginTop: 20}} color="#67B3C9" size="large" /> }

                { isSearching === false && userList.length === 0 && <View style={{marginTop: 20}}>
                    <Text style={{fontFamily: 'opsReg', textAlign: 'center'}}> No results </Text>
                </View> }

                { userList.map(item => {
                    return (
                        <TouchableHighlight onPress={() => {
                            console.log(item.username)
                        }} underlayColor="transparent" key={item._id}>
                            <View style={{paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, elevation: 0.5, backgroundColor: 'white'}} >
                                <Text style={{fontFamily: 'opsSemi', fontSize: 18}}> {item.firstName} {item.lastName} </Text>
                                <Text style={{fontFamily: 'opsLight'}}> @{item.username} </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }) }
            </View>
            
        </View>
    )

}

export default SearchScreen
import React, { FC, useState } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text, ToastAndroid } from 'react-native'
import { Input, Button } from 'react-native-elements'
import axios from 'axios'
import { useDispatch } from "react-redux";

// Constants
import { celticB } from "../../../constants/Colors";
import { PROD_URL } from "../../../helpers/url";
import { createUserGql } from "../../../gql/mutations";

// Redux
import { loginUser, authUser } from "../../../redux/actions/actions"

interface Props {
    toggleMode: Function
}

const Register: FC<Props> = ({toggleMode}) => {

    const dispatch = useDispatch()

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const submitRegister = async () => {

        setIsLoading(true)

        const {data} = await axios.post(PROD_URL, {
            query: createUserGql,
            variables: {
                firstName: fName,
                lastName: lName,
                email,
                password
            }
        }, { headers: {
            'register': true
        } })

        if (data.data.createUser) {
            setIsLoading(false)
            dispatch(loginUser(data.data.createUser))
            dispatch(authUser())
            return 
        }

        console.log(data.errors)

        if (data.errors[0].message) {
            setIsLoading(false)
            ToastAndroid.showWithGravity(data.errors[0].message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            return 
        }

        

    }

    return (
        <KeyboardAvoidingView style={s.root}>

            <View style={s.titleRoot}>
                <Text style={s.title} > Sign Up </Text>
            </View>

            <Input value={fName} onChangeText={setFName} inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} label="First Name" leftIcon={
                { type: 'ionicon', color: celticB, name: 'person-outline'}
            } />
            <Input value={lName} onChangeText={setLName} inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} label="Last Name" leftIcon={
                { type: 'ionicon', color: celticB, name: 'person-outline'}
            } />
            <Input value={email} autoCapitalize="none" onChangeText={setEmail} inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} autoCompleteType="email" label="Email Address" leftIcon={
                { type: 'ionicon', color: celticB, name: 'mail-outline'}
            } />
            <Input returnKeyType="done" value={password} onChangeText={setPassword} inputStyle={{
                color: celticB,
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} secureTextEntry={true} label="Password" leftIcon={
                { type: 'ionicon', color: celticB, name: 'key-outline'}
            } />

            <Button loading={isLoading} buttonStyle={s.button} onPress={() => {
                submitRegister()
            }} titleStyle={{ fontFamily: 'opsReg' }} title="Sign Up" />

            <Text style={{marginHorizontal: 5, fontFamily: 'opsReg'}} onPress={() => toggleMode('login')} > Already have an account?<Text style={{fontFamily: 'opsBolder', color: "#3373C4"}}> Sign in now</Text>. </Text> 

        </KeyboardAvoidingView>
    )

}

export default Register

const s = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: 'white'
    },
    inputs: {
        marginHorizontal: 5,
        fontFamily: 'opsReg'
    },
    titleRoot: {
        marginBottom: 15,
    },
    title: {
        fontSize: 40,
        fontFamily: 'opsBold',
        color: celticB
    },
    button: {
        backgroundColor: celticB,
        marginHorizontal: 5,
        marginBottom: 15,
        height: 50,
        borderRadius: 25
    }
})
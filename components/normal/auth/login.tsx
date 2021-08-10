import React, { FC, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid, Keyboard } from 'react-native'
import { Input, Button } from "react-native-elements";
import axios from 'axios'
import { useDispatch } from "react-redux";

// Url
import { PROD_URL } from '../../../helpers/url'

// GQL
import { loginGql } from '../../../gql/queries'

// Redux
import { loginUser, authUser } from "../../../redux/actions/actions"

// Types
interface Props {
    toggleMode: Function
}

const Login: FC<Props> = ({toggleMode}) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    // const [errMsg, setErrMsg] = useState("")

    const loginSubmit = async () => {

        Keyboard.dismiss()
        setIsLoading(true)

        await axios.post(PROD_URL, {
            query: loginGql,
            variables: {
                email,
                password
            }
        }, {
            headers: {
                'login': true
            }
        }).then(res => {
            dispatch(loginUser(res.data.data.loginUser))
            dispatch(authUser())

            res.data.errors[0].message && ToastAndroid.showWithGravity(res.data.errors[0].message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            // console.log(res.data.errors[0].message)
            // setErrMsg(res.data.errors[0].message)

            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })

    }

    return (
        <KeyboardAvoidingView style={s.root}>
            <View>

                <View style={s.title}>
                    <Text style={{fontSize: 40, fontFamily: 'opsBold'}} > Social-Lorem </Text>
                </View>

                <Input style={s.inputs} label="Email Address" leftIcon={
                    { type: 'material', color: 'gray', name: 'mail-outline', iconStyle: {justifyContent: 'center'} }
                } placeholder="Email Address" value={email} onChangeText={setEmail} />
                <Input style={s.inputs} secureTextEntry={true} label="Password" leftIcon={
                    { type: 'material', color: 'gray', name: 'vpn-key', iconStyle: {justifyContent: 'center'} }
                } placeholder="Password" value={password} onChangeText={setPassword} />

                <Button loading={isLoading} onPress={loginSubmit} buttonStyle={s.button} titleStyle={{ fontFamily: 'opsReg', textTransform: "uppercase" }} title="Sign In" />

                <Text style={{marginHorizontal: 5, fontFamily: 'opsReg'}} onPress={() => toggleMode('register')} > No account? Sign up here. </Text> 

            </View>
        </KeyboardAvoidingView>
    )

}

export default Login

const s = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    inputs: {
        marginHorizontal: 5,
        fontFamily: 'opsReg'
    },
    title: {
        marginBottom: 15
    },
    button: {
        backgroundColor: 'black',
        marginHorizontal: 5,
        marginBottom: 15,
        height: 50
    }
})
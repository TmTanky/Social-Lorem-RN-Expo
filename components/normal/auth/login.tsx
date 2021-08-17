import React, { FC, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid, Keyboard, Image } from 'react-native'
import { Input, Button } from "react-native-elements";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

// Url
import { PROD_URL } from '../../../helpers/url'

// GQL
import { loginGql } from '../../../gql/queries'

// Redux
import { loginUser, authUser } from "../../../redux/actions/actions"

// Svg
import LoginImg from '../../../assets/loginaccount.svg'

// Types
import { Istate } from '../../../types/index'
interface Props {
    toggleMode: Function
}

const Login: FC<Props> = ({toggleMode}) => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: Istate) => state.auth)

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
            
            console.log(res.data)

            if (res.data.data.loginUser) {
                dispatch(loginUser(res.data.data.loginUser))
                dispatch(authUser())
                setIsLoading(false)
                return 
            }

            if (res.data.errors[0].message) {
                setIsLoading(false)
                ToastAndroid.showWithGravity(res.data.errors[0].message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                return 
            }

            // console.log('yawa')
            // dispatch(loginUser(res.data.data.loginUser))
            // dispatch(authUser())
            // setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })

    }

    return (
        <KeyboardAvoidingView style={s.root}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <LoginImg width={'80%'} height={'35%'} />
            </View>

            <View style={{marginHorizontal: 10, flex: 1.8}}>

                <View style={s.titleRoot}>
                    <Text style={s.title} > Login {`${isAuth}`} </Text>
                </View>

                <Input inputStyle={{
                    fontSize: 15
                }} style={s.inputs} label="Email Address" autoCompleteType="email" labelStyle={{color: "black"}} leftIcon={
                    { type: 'ionicon', color: "#3373C4", name: 'mail-outline', iconStyle: {justifyContent: 'center'} }
                } value={email} onChangeText={setEmail} />
                <Input inputStyle={{
                    fontSize: 15
                }} style={s.inputs} secureTextEntry={true} labelStyle={{color: "black"}} label="Password" leftIcon={
                    { type: 'ionicon', color: "#3373C4", name: 'key-outline', iconStyle: {justifyContent: 'center'} }
                } value={password} onChangeText={setPassword} />

                <Button loading={isLoading} onPress={loginSubmit} buttonStyle={s.button} titleStyle={{ fontFamily: 'opsReg', color: "white" }} title="Sign In" />

                <Text style={{marginHorizontal: 5, fontFamily: 'opsReg', color: "black"}} onPress={() => toggleMode('register')} > No account?<Text style={{fontFamily: 'opsBolder', color: "#3373C4"}}> Sign up here</Text>. </Text> 

            </View>
        </KeyboardAvoidingView>
    )

}

export default Login

const s = StyleSheet.create({
    root: {
        flex: 1,
        // justifyContent: 'center',
        // marginHorizontal: 10,
        backgroundColor: "white",
    },
    inputs: {
        marginHorizontal: 5,
        fontFamily: 'opsReg'
    },
    titleRoot: {
        marginBottom: 15
    },
    title: {
        fontSize: 40,
        fontFamily: 'opsBold',
        color: "#3373C4"
        // color: 'white'
    },
    button: {
        backgroundColor: "#3373C4",
        marginHorizontal: 5,
        marginBottom: 15,
        height: 50,
        borderRadius: 25
        // backgroundColor: 'white'
    }
})
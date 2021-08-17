import React, { FC } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'

interface Props {
    toggleMode: Function
}

const Register: FC<Props> = ({toggleMode}) => {

    return (
        <KeyboardAvoidingView style={s.root}>

            <View style={s.titleRoot}>
                <Text style={s.title} > Sign Up </Text>
            </View>

            <Input inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} label="First Name" leftIcon={
                { type: 'ionicon', color: "#3373C4", name: 'person-outline'}
            } />
            <Input inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} label="Last Name" leftIcon={
                { type: 'ionicon', color: "#3373C4", name: 'person-outline'}
            } />
            <Input inputStyle={{
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} autoCompleteType="email" label="Email Address" leftIcon={
                { type: 'ionicon', color: "#3373C4", name: 'mail-outline'}
            } />
            <Input inputStyle={{
                color: "#3373C4",
                fontSize: 15
            }} labelStyle={{color: "black"}} style={s.inputs} secureTextEntry={true} label="Password" leftIcon={
                { type: 'ionicon', color: "#3373C4", name: 'key-outline'}
            } />

            <Button buttonStyle={s.button} titleStyle={{ fontFamily: 'opsReg' }} title="Sign Up" />

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
        color: "#3373C4"
    },
    button: {
        backgroundColor: "#3373C4",
        marginHorizontal: 5,
        marginBottom: 15,
        height: 50,
        borderRadius: 25
    }
})
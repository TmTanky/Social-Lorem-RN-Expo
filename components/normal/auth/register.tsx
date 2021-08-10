import React, { FC } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'

interface Props {
    toggleMode: Function
}

const Register: FC<Props> = ({toggleMode}) => {

    return (
        <KeyboardAvoidingView style={s.root}>

            <View style={s.title}>
                <Text style={{fontSize: 40, fontFamily: 'opsBold'}} > Sign Up </Text>
            </View>

            <Input style={s.inputs} label="First Name" leftIcon={
                    { type: 'material', color: 'gray', name: 'person-outline'}
            } placeholder="First Name" />
            <Input style={s.inputs} label="Last Name" leftIcon={
                    { type: 'material', color: 'gray', name: 'person-outline'}
            } placeholder="Last Name" />
            <Input style={s.inputs} label="Email Address" leftIcon={
                    { type: 'material', color: 'gray', name: 'mail-outline'}
            } placeholder="Email Address" />
            <Input style={s.inputs} secureTextEntry={true} label="Password" leftIcon={
                { type: 'material', color: 'gray', name: 'vpn-key'}
            } placeholder="Password" />

            <Button buttonStyle={s.button} titleStyle={{ fontFamily: 'opsReg',textTransform: "uppercase" }} title="Sign Up" />

            <Text style={{marginHorizontal: 5, fontFamily: 'opsReg'}} onPress={() => toggleMode('login')} > Already have an account? Sign in now. </Text> 

        </KeyboardAvoidingView>
    )

}

export default Register

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
import React, { useState, useReducer, useCallback, useEffect } from "react"
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Button,
	ActivityIndicator,
    Alert
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch } from "react-redux"
import * as authActions from "../../store/action/auth"

import Input from "../../components/UI/Input"
import Card from "../../components/UI/Card"
import colors from "../../constants/colors"

const LoginScreen = (props) => {
    return (
        <View>
            <Text>LOGIN HERE BOOOOI</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})

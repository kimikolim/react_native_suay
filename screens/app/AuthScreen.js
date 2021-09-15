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
import DefaultText from "../../components/UI/DefaultText"

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"
const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
		const updatedValidity = {
			...state.inputValidity,
			[action.input]: action.isValid,
		}
		let updatedFormIsValid = true
		for (const key in updatedValidity) {
			updatedFormIsValid = updatedFormIsValid && updatedValidity[key]
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValues: updatedValues,
			inputValidity: updatedValidity,
		}
	}
	return state
}

const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
	const [isSignup, setIsSignup] = useState(false)
	const dispatch = useDispatch()


    const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: "",
			password: "",
		},
		inputValidity: {
			email: false,
			password: false,
		},
		formIsValid: false,
	})

    useEffect(()=>{
        if(error){
            Alert.alert('An error has occured', error, [{text: 'Okay'}])
        }
    }, [error])

    //Toggle check between Signup and Login
    const authHandler = async () => {
		let action = null
		if (isSignup) {
			action = authActions.signup(
				formState.inputValues.email,
				formState.inputValues.password
			)
		} else {
			action = authActions.login(
				formState.inputValues.email,
				formState.inputValues.password
			)
		}
        setError(null)
		setIsLoading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Main')
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
	}

    const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			})
		},
		[dispatchFormState]
	)

    return (
        <KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
				<DefaultText style={styles.header}>SUAY.</DefaultText>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id="email"
							label="E-mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter valid email address"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							minLength={5}
							autoCapitalize="none"
							errorText="Please enter a valid password"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<View style={styles.btnContainer}>
							{isLoading? <ActivityIndicator size='small' color={colors.primary} /> : <Button
								title={isSignup ? "Sign Up" : "Login"}
								color={colors.accent}
								onPress={authHandler}
							/>}
						</View>
						<View style={styles.btnContainer}>
							<Button
								title={`Tap to ${isSignup ? "Login" : "Sign Up"}`}
								color={colors.accent}
								onPress={() => {
									setIsSignup((prevState) => !prevState)
								}}
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
	headerTitle: "Login/Signup",
}

export default AuthScreen

const styles = StyleSheet.create({
    screen: {
		flex: 1,
	},
	authContainer: {
		width: "80%",
		maxWidth: 400,
		// height: '80%',
		padding: 40,
		maxHeight: 400,
	},
	gradient: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer: {
		marginTop: 30,
	},
	header: {
		fontFamily: "boldText",
		fontSize: 48,
		marginBottom: 18,
		color: colors.accent
	}
})

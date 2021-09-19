import React, { useState, useEffect, useCallback, useReducer } from "react"
import {
	StyleSheet,
	View,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import { useSelector, useDispatch } from "react-redux"
// import * as productsActions from "../../store/action/products"
import Input from "../../components/UI/Input"
import colors from "../../constants/colors"

//Screen reducer
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

const UserItemEditScreen = (props) => {
    const itemID = props.navigation.getParam('itemID')
    const editedItem = useSelector(state => state.items.userItems.find(item => item.id === itemID))
    //Screen state snapshot
    const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedItem ? editedItem.title : "",
			imgURL: editedItem ? editedItem.imgURL : "",
			description: editedItem ? editedItem.description : "",
			price: editedItem ? editedItem.price : "",
		},
		inputValidity: {
			title: editedItem ? true : false,
			imgURL: editedItem ? true : false,
			description: editedItem ? true : false,
			price: editedItem ? true : false,
		},
		formIsValid: editedItem ? true : false,
	})

    const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			// let isValid = false
			// if (text.trim().length > 0) {
			// 	isValid = true
			// }
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
			style={styles.keyboardView}
			behavior="padding"
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				<View style={styles.form}>
					<Input
						id="title"
						label="Title"
						errorText="Please enter valid title."
						keyboardType="default"
						autoCapitalize="sentences"
						autoCorrect
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						initialValue={editedItem ? editedItem.title : ""}
						initiallyValid={!!editedItem}
						required
					/>
					<Input
						id="imgURL"
						label="Image URL"
						errorText="Please enter valid URL."
						keyboardType="default"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						initialValue={editedItem ? editedItem.imgURL : ""}
						initiallyValid={!!editedItem}
						required
					/>

					<Input
						id="price"
						label="Price ($)"
						errorText="Please enter valid price."
						keyboardType="decimal-pad"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
                        initialValue={editedItem ? editedItem.price.toString() : ""}
                        initiallyValid={!!editedItem}
						required
						min={0.1}
					/>

					<Input
						id="description"
						label="Description"
						errorText="Please enter valid description."
						keyboardType="default"
						autoCapitalize="sentences"
						autoCorrect
						onInputChange={inputChangeHandler}
						multiline
						numberOfLines={3}
						initialValue={editedItem ? editedItem.description : ""}
						initiallyValid={!!editedItem}
						required
						minLength={5}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
    )
}

UserItemEditScreen.navigationOptions = (navData) => {
	const submitFunc = navData.navigation.getParam("submit")
	return {
		headerTitle: navData.navigation.getParam("itemID")
			? "Edit Product"
			: "Add Product",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName={
						Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
					}
					onPress={submitFunc}
				/>
			</HeaderButtons>
		),
	}
}

export default UserItemEditScreen

const styles = StyleSheet.create({
    form: {
		margin: 20,
	},
	keyboardView: {
		flex: 1,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})

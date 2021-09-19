import React, { useState, useEffect, useCallback, useReducer } from "react"
import {
	StyleSheet,
	View,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView,
	ActivityIndicator,
	Button,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import { useSelector, useDispatch } from "react-redux"
import * as itemsActions from "../../store/action/items"
import Input from "../../components/UI/Input"
import colors from "../../constants/colors"
import DefaultText from "../../components/UI/DefaultText"

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
    const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	// const [purchaseDate, setPurchaseDate] = useState(new Date())
	// const [warrantyDate, setWarrantyDate] = useState(new Date())
    const dispatch = useDispatch()

    useEffect(() => {
		if (error) {
			Alert.alert("An error occured", error, [{ text: "Okay" }])
		}
	}, [error])


	const itemID = props.navigation.getParam("itemID")
	const editedItem = useSelector((state) =>
		state.items.userItems.find((item) => item.id === itemID)
	)
	//Screen state snapshot
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedItem ? editedItem.title : "",
			description: editedItem ? editedItem.description : "",
			imgURL: editedItem ? editedItem.imgURL : "",
			price: editedItem ? editedItem.price : "",
			datePurchased: editedItem ? editedItem.datePurchased : "",
			dateExpired: editedItem ? editedItem.dateExpired : "",
		},
		inputValidity: {
			title: editedItem ? true : false,
			imgURL: editedItem ? true : false,
			description: editedItem ? true : false,
			price: editedItem ? true : false,
			datePurchased: editedItem ? true : false,
			dateExpired: editedItem ? true : false,
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

    const submitHandler = useCallback(async () => {
		if (!formState.formIsValid) {
			Alert.alert("Wrong Input", "Please check error in the form.", [
				{ text: "Okay" },
			])
			return
		}
		setError(null)
		setIsLoading(true)
		try {
			if (editedItem) {
				await dispatch(
					itemsActions.updateItem(
						itemID,
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imgURL,
						+formState.inputValues.price,
						formState.inputValues.datePurchased,
						formState.inputValues.dateExpired,
					)
				)
			// console.log(edited);
			} else {
				await dispatch(
					itemsActions.createItem(
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imgURL,
						+formState.inputValues.price,
						formState.inputValues.datePurchased,
						formState.inputValues.dateExpired,
					)
				)
			}
			props.navigation.goBack()
		} catch (error) {
			// console.log(error.message);
			setError(error.message)
		}
		setIsLoading(false)
	}, [dispatch, itemID, formState])

    useEffect(() => {
		props.navigation.setParams({ submit: submitHandler })
	}, [submitHandler])

	// const onChangePurchaseDate = (event, selectedDate) => {
	// 	const purchaseDate = selectedDate || date
	// 	setDate(currentDate)
	// }

	// const onChangeWarrantyDate = (event, selectedDate) => {
	// 	const warrantyDate = selectedDate || date
	// 	setDate(currentDate)
	// }

    if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		)
	}

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

					<Input
						id="datePurchased"
						label="Date Purchased (dd/mm/yyyy)"
						errorText="Please enter date."
						keyboardType="numbers-and-punctuation"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						initialValue={editedItem ? editedItem.datePurchased : ""}
						initiallyValid={!!editedItem}
						required
					/>

					<Input
						id="dateExpired"
						label="Warranty expiry (dd/mm/yyyy)"
						errorText="Please enter date."
						keyboardType="numbers-and-punctuation"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						initialValue={editedItem ? editedItem.dateExpired : ""}
						initiallyValid={!!editedItem}
						required
					/>

					{/* <View style={styles.dateContainer}>
						<View>
							<View>
								<DefaultText>Date Purchased</DefaultText>
							</View>

							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeDate}
							/>
						</View>
						<View>
							<View>
								<DefaultText>Warranty expiry</DefaultText>
							</View>

							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeDate}
							/>
						</View>
					</View> */}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

UserItemEditScreen.navigationOptions = (navData) => {
	const submitTickBtn = navData.navigation.getParam("submit")
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
					onPress={submitTickBtn}
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
	dateContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
	},
})

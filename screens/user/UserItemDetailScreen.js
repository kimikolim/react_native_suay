import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
//redux actions
import * as itemsActions from '../../store/action/items'

//constants
import colors from '../../constants/colors'
import DefaultText from '../../components/UI/DefaultText'

const UserItemDetailScreen = (props) => {
    //params from adminitemscreen - itemID , itemTitle
    const itemID = props.navigation.getParam('itemID')
    const selectedItem = useSelector(state => state.items.userItems.find((item) => item.id === itemID))
	//check if item is favorited
	const isFavourited = useSelector(state => {
		// console.log(state.items.favouriteItems);
		return state.items.favouriteItems.some(item => item.id === itemID)
	})
	// console.log(checkFavourited)
	const dispatch = useDispatch()

	const toggleFavouriteHandler = useCallback(() => {
		const {toggleFavourite} = itemsActions
		dispatch(toggleFavourite(itemID))
	}, [dispatch, itemID])

	const editProductHandler = (id) => {
		props.navigation.navigate('UserEdit', {itemID: id})
	}

	const deleteAction = async(id) => {
		await dispatch(itemsActions.deleteItem(id))
		props.navigation.goBack()
	}
	const deleteHandler = useCallback((itemID) => {
		Alert.alert('Are you sure?', 'Product will be permanantly deleted.', [
			{text: 'No', style:'default'},
			{text: 'Yes', style: 'destructive', onPress: () => {
				deleteAction(itemID)
			}}
		])
	}, [dispatch, deleteAction])


	// if (!selectedItem || selectedItem == null) {
	// 	props.navigation.goBack()
	// 	return
	// }
	useEffect(() => {
		props.navigation.setParams({toggleFav: toggleFavouriteHandler})
	}, [toggleFavouriteHandler])

	useEffect(() => {
		props.navigation.setParams({isFav: isFavourited})
	}, [isFavourited])

	if (selectedItem) {
		return (
			<ScrollView>
				<Image style={styles.image} source={{ uri: selectedItem.imgURL }} />
				<View style={styles.action}>
					<Button
						color={colors.secondary}
						title="Edit"
						onPress={() => {editProductHandler(selectedItem.id)}}
					/>
					<Button
						color={colors.secondary}
						title="Delete"
						onPress={() => {deleteHandler(selectedItem.id)}}
					/>
				</View>
				<Text style={styles.price}>${selectedItem.price.toFixed(2)}</Text>
				<View style={styles.date}>
					<DefaultText style={styles.dateText}>Purchased on: {selectedItem.datePurchased}</DefaultText>
					<DefaultText style={styles.dateText}>Expiry: {selectedItem.dateExpired}</DefaultText>
				</View>
				<Text style={styles.description}>{selectedItem.description}</Text>
			</ScrollView>
		)
	}
	return (
		<ScrollView></ScrollView>
	)

}

UserItemDetailScreen.navigationOptions = navData => {
	const itemTitle = navData.navigation.getParam('itemTitle')
	const toggleFavourite = navData.navigation.getParam('toggleFav')
	const isFavourite =  navData.navigation.getParam('isFav')
    return {
        headerTitle: itemTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favourite"
					iconName={isFavourite ? "ios-star" : "ios-star-outline"}
					onPress={toggleFavourite}
				/>
			</HeaderButtons>
		),
    }
}

export default UserItemDetailScreen

const styles = StyleSheet.create({
    image: {
		width: "100%",
		height: 300,
	},
	price: {
		fontSize: 20,
		color: "#888",
		textAlign: "center",
		marginVertical: 20,
		fontFamily: 'normalText'
	},
	description: {
		fontSize: 20,
		textAlign: "center",
		marginHorizontal: 20,
        marginVertical: 10,
		fontFamily: 'normalText'
	},
	action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
		marginVertical: 15,
		alignItems: 'center'
	},
    date: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15
    },
    dateText: {
        color: '#888',
        fontSize: 16
    },
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})

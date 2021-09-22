import React, { useCallback, useState, useEffect } from "react"
import { FlatList, Button, StyleSheet, View, Text, ActivityIndicator, Platform } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import { useSelector, useDispatch } from "react-redux"
//Components
import ProductItem from "../../components/app/ProductItem"
import colors from "../../constants/colors"
import * as itemsActions from '../../store/action/items'

const AdminItemsScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [error, setError] = useState()
	const dispatch = useDispatch()

	const loadItems = useCallback(async() => {
		setError(null)
		setIsRefreshing(true)
		try {
			await dispatch(itemsActions.fetchItems())
		} catch (error) {
			setError(error)
		}
		setIsRefreshing(false)
	}, [dispatch, setIsLoading, setError])
	const allItems = useSelector((state) => state.items.allItems)

	useEffect(() => {
		const willFocusSub = props.navigation.addListener('willFocus', loadItems)

		return () => {
			willFocusSub.remove()
		}
	}, [loadItems])

	useEffect(() => {
		setIsLoading(true)
		loadItems().then(() => {
			setIsLoading(false)
		}).catch(err => console.log(err))
	}, [dispatch, loadItems])

	const selectItemHandler = (id, title) => {
        // console.log("button pressed");
        props.navigation.navigate("AdminDetails", {
            itemID: id,
            itemTitle: title,
        })
    }

	if (error) {
		return <View style={styles.loading}>
			<Text>Oh no.. there seems to be an error.</Text>
			<Button  title='Try Again' onPress={loadItems} color={colors.primary}/>
		</View>
	}

	if (isLoading) {
		return <View style={styles.loading}>
			<ActivityIndicator size='large' color={colors.primary} />
		</View>
	}
	if (!isLoading && allItems.length === 0) {
		return <View style={styles.loading}>
			<Text>No Items Found.</Text>
		</View>
	}



	return (
		<FlatList
			onRefresh={loadItems}
			refreshing={isRefreshing}
			data={allItems}
			renderItem={(itemData) => (
				<ProductItem
				image={itemData.item.imgURL}
				title={itemData.item.title}
				dateExpiry={itemData.item.dateExpired}
				onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
				>
					<Button
						color={colors.primary}
						title="View"
						onPress={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
					/>
					<Button
						color={colors.primary}
						title="Delete"
						onPress={() => {}}
					/>
				</ProductItem>
			)}
		/>
	)
}

AdminItemsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Administrator',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
	}
}

export default AdminItemsScreen

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

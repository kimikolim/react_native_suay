import React from "react"
import { FlatList, Button, Alert } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import { useSelector } from "react-redux"
//Components
import ProductItem from "../../components/app/ProductItem"
import colors from "../../constants/colors"

const AdminItemsScreen = (props) => {
	const allItems = useSelector((state) => state.items.allItems)
	return (
		<FlatList
			data={allItems}
			renderItem={(itemData) => (
				<ProductItem
				image={itemData.item.imgURL}
				title={itemData.item.title}
				dateExpiry={itemData.item.dateExpired}
				onSelect={() => {}}
				>
					<Button
						color={colors.primary}
						title="View"
						onPress={() => {}}
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
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Add"
					iconName={Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"}
					onPress={() => {
						navData.navigation.navigate('')
					}}
				/>
			</HeaderButtons>
		),
	}
}

export default AdminItemsScreen

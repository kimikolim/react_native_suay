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

	const selectItemHandler = (id, title) => {
        // console.log("button pressed");
        props.navigation.navigate("AdminDetails", {
            itemID: id,
            itemTitle: title,
        })
    }
	return (
		<FlatList
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

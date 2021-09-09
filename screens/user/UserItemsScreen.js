import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'

//components
import ProductItem from '../../components/app/ProductItem'
import colors from '../../constants/colors'

import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"


const UserItemsScreen = (props) => {
    // console.log(props);
    const selectItemHandler = (id, title) => {
        // console.log("button pressed");
        props.navigation.navigate("UserItemDetail", {
            itemID: id,
            itemTitle: title,
        })
    }
    const userItems = useSelector(state => state.items.userItems)
    return (
       <FlatList data={userItems} renderItem={(itemData) => (
        <ProductItem
            image={itemData.item.imgURL}
            title={itemData.item.title}
            dateExpiry={itemData.item.dateExpired}
            onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
            }}
        >
            <Button
                color={colors.primary}
                title="View Details"
                onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            />
            <Button
                color={colors.primary}
                title="Edit"
                onPress={() => {}}
            />
        </ProductItem>
    )}/>
    )
}

UserItemsScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Your Items",
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

export default UserItemsScreen

const styles = StyleSheet.create({})


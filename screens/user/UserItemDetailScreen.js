import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import { useSelector } from 'react-redux'

//constants
import colors from '../../constants/colors'
import DefaultText from '../../components/UI/DefaultText'

const UserItemDetailScreen = (props) => {
    //params from adminitemscreen - itemID , itemTitle
    const itemID = props.navigation.getParam('itemID')
    const selectedItem = useSelector(state => state.items.userItems.find((item) => item.id === itemID))

	const editProductHandler = (id) => {
		props.navigation.navigate('UserEdit', {itemID: id})
	}

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
					onPress={() => {}}
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

UserItemDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('itemTitle')
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
    }
})

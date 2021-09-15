import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AdminDetailsScreen = (props) => {
    const itemID = props.navigation.getParam('itemID')
    const selectedItem = useSelector(state => state.items.allItems.find((item) => item.id === itemID))


    return (
        <View>
            <Text>Admin view details screen</Text>
        </View>
    )
}

export default AdminDetailsScreen

const styles = StyleSheet.create({})

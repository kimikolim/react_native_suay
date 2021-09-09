import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        //shadow only works for IOS
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5, //for android
		borderRadius: 10,
		backgroundColor: "white",
    }
})
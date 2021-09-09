import React from "react";
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";

//custom styles
import Card from '../UI/Card'
import DefaultText from "../UI/DefaultText";

const ProductItem = (props) => {
	//For android ripple effect
	let TouchableComponent = TouchableOpacity;
	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableComponent = TouchableNativeFeedback;
	}

	return (
		<Card style={styles.product}>
			<View style={styles.touchable}>
				<TouchableComponent onPress={props.onSelect} useForeground>
					<View>
						<View style={styles.imgContainer}>
							<Image style={styles.image} source={{ uri: props.image }} />
						</View>
						<View style={styles.textContainer}>
							<DefaultText style={styles.title}>{props.title}</DefaultText>
							<DefaultText style={styles.date}>Warranty: {props.dateExpiry}</DefaultText>
						</View>
						<View style={styles.actions}>
							{props.children}
							{/* //buttons */}
						</View>
					</View>
				</TouchableComponent>
			</View>
		</Card>
	);
};

export default ProductItem;

const styles = StyleSheet.create({
	product: {
		height: 300,
		margin: 20,
	},
	touchable: {
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 18,
		marginVertical: 2,
		fontFamily: 'boldText'
	},
	date: {
		fontSize: 14,
		color: "#888",
		fontFamily: 'normalText'
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "23%",
		paddingHorizontal: 20,
	},
	textContainer: {
		alignItems: "center",
		height: "17%",
		padding: 10,
	},
	imgContainer: {
		width: "100%",
		height: "60%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
	},
});
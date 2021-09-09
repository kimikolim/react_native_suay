import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

//Custom font styles
import * as Fonts from "expo-font"
import AppLoading from "expo-app-loading"
import DefaultText from "./components/DefaultText"

const fetchFonts = () => {
	return Fonts.loadAsync({
		boldText: require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
		normalText: require("./assets/fonts/Raleway-Medium.ttf"),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<DefaultText>Open up App.js to start working on your app!</DefaultText>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})

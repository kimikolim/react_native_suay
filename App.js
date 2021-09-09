import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import SuayNavigator from "./navigation/SuayNavigator"
import ReduxThunk from 'redux-thunk'

//Custom font styles
import * as Fonts from "expo-font"
import AppLoading from "expo-app-loading"

import itemsReducer from './store/reducer/items'

const rootReducer = combineReducers({
  items: itemsReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

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
		<Provider store={store}>
      <SuayNavigator />
    </Provider>
	)
}


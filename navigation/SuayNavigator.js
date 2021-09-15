import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import colors from '../constants/colors'
import { Platform } from "react-native";
import {createDrawerNavigator} from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

//Screens
import AdminItemsScreen from '../screens/app/AdminItemsScreen'
import UserItemsScreen from '../screens/user/UserItemsScreen'
import UserItemDetailScreen from '../screens/user/UserItemDetailScreen'
import UserItemEditScreen from '../screens/user/UserItemEditScreen'
import AdminDetailsScreen from '../screens/app/AdminDetailsScreen'
import AuthScreen from "../screens/app/AuthScreen";

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? colors.primary : "",
	},
	headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
	headerTitleStyle: {
		fontFamily: "boldText",
	},
}

const UserNavigator = createStackNavigator(
	{
		UserItems: UserItemsScreen,
		UserItemDetail: UserItemDetailScreen,
        UserEdit: UserItemEditScreen
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
			size={23}
			color={drawerConfig.tintColor}
			 />
		},
		defaultNavigationOptions: defaultNavOptions
	}
)

const AdminNavigator = createStackNavigator({
    AdminItems: AdminItemsScreen,
	AdminDetails: AdminDetailsScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
         />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
)



const MainNavigator = createDrawerNavigator({
    Users: UserNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
		activeTintColor: colors.primary
	}
})

const AuthenticatedNavigator = createSwitchNavigator({
	Auth: AuthNavigator,
	Main: MainNavigator,

})

export default createAppContainer(AuthenticatedNavigator)
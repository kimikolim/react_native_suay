import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/action/auth'

//custom
import colors from '../../constants/colors'

const LauncherScreen = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const verifyLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            // console.log(userData);
            if (!userData) {
                props.navigation.navigate('Auth')
                return
            }
            const transformData = JSON.parse(userData)
            // console.log(transformData);
            const { token, userID, expiryDate } = transformData
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userID) {
                props.navigation.navigate('Auth')
                return
            }

            props.navigation.navigate('Main')
            dispatch(authActions.authenticate(userID, token))
        }
        verifyLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}

export default LauncherScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

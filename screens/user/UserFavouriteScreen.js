import React, {useCallback, useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

//components
import ProductItem from '../../components/app/ProductItem'
import colors from '../../constants/colors'
import * as itemsActions from '../../store/action/items'
import DefaultText from '../../components/UI/DefaultText'
//Header buttons
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"


const UserFavouriteScreen = (props) => {
      // console.log(props);
      const [isLoading, setIsLoading] = useState(false)
      const [isRefreshing, setIsRefreshing] = useState(false)
      const [error, setError] = useState()
      const dispatch = useDispatch()

      //fetching items state from firebase (redux items action fetchItems func)
      const loadItems = useCallback(async() => {
          setError(null)
          setIsRefreshing(true)
          try {
              await dispatch(itemsActions.fetchItems())
          } catch (error) {
              setError(error)
          }
          setIsRefreshing(false)
      }, [dispatch, setIsLoading, setError])

      //fetching user's items state from redux store
      const favItems = useSelector(state => state.items.favouriteItems)

      //event listener for pull to refresh functionality
      useEffect(() => {
          const willFocusSub = props.navigation.addListener('willFocus', loadItems)

          return () => {
              willFocusSub.remove()
          }
      }, [loadItems])

      //.then used bcuz unable to use async in useEffect, alternatively create new function and useCallback
      useEffect(() => {
          setIsLoading(true)
          loadItems().then(() => {
              setIsLoading(false)
          }).catch(err => console.log(err))
      }, [dispatch, loadItems])

      //redirect to edit page - prefilled || new form
      const editProductHandler = (id) => {
          props.navigation.navigate("UserEdit", { itemID: id })
      }
      //redirect to item details
      const selectItemHandler = (id, title) => {
          // console.log("button pressed");
          props.navigation.navigate("UserItemDetail", {
              itemID: id,
              itemTitle: title,
          })
      }

      //when an error occurs fetching data from firebase
      if (error) {
          return <View style={styles.loading}>
              <DefaultText>Oh no.. there seems to be an error.</DefaultText>
              <Button  title='Try Again' onPress={loadItems} color={colors.primary}/>
          </View>
      }
      //when item is loading
      if (isLoading) {
          return <View style={styles.loading}>
              <ActivityIndicator size='large' color={colors.primary} />
          </View>
      }
      //when firebase retrieval successful but no products found
      if (!isLoading && favItems.length === 0) {
          return <View style={styles.loading}>
              <DefaultText>You have no favorite items.</DefaultText>
          </View>
      }




      return (
         <FlatList onRefresh={loadItems} refreshing={isRefreshing} data={favItems} renderItem={(itemData) => (
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
                  onPress={() => {editProductHandler(itemData.item.id)}}
              />
          </ProductItem>
      )}/>
      )
}

UserFavouriteScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Your Favourites",
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

export default UserFavouriteScreen

const styles = StyleSheet.create({
    loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

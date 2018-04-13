import React from 'react'
import Lighting from '../pages/Lighting/Lighting'
import Location from '../pages/Location/Location'
import Temperature from '../pages/Temperature/Temperature'
import Login from '../pages/Login/Login'
import Reports from '../pages/Reports/Reports'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Title, View } from 'native-base';


const AuthCheck = props => {
  const { user } = props.screenProps.getState()
  if (user && user.id) {
    props.navigation.replace('App')
  } else {
    props.navigation.replace('Login')
  }
  return null
}
const tabIcons = {
  Lighting: 'lightbulb-outline',
  Temperature: 'thermometer',
  Location: 'map-marker-outline',
  Reports: 'chart-line'
}
export default StackNavigator(
  {
    AuthCheck,
    Login,
    App: TabNavigator(
      {
        Lighting,
        Temperature,
        Location,
        Reports
      },
      {
        navigationOptions: ({ navigation }) => ({
          header: null,
          tabBarIcon: ({ tintColor }) => <Icon name={tabIcons[navigation.state.routeName]} size={25} color={tintColor} />
        }),
        tabBarOptions: {
          showIcon: true
        }
      }
    )
  },
  {
    initialRouteName: 'AuthCheck',
    navigationOptions: {
      header: null
    }
  }
)

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Container,
  Content,
  Button,
  Drawer,
  H3,
  Text,
  Left,
  Right,
  Body,
  ListItem,
  Card,
  CardItem,
  Icon,
  List
} from 'native-base'
// Custom Imports
import HeaderComponent from '../../headerComponent'
import { ErrorToast } from '../../common/toast'
import Lighting from '../Lighting/Lighting'
import SpinnerComponent from '../../common/spinner'
import Sidebar from '../../components/Sidebar'
import Status from './Status'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Users from '../../query/Users'
import Locations from '../../query/Locations'
import Temperatures from '../../query/Temperatures'
import SetTemperature from '../../mutation/Temperature'
import { backgrounds,components } from '../../common/styles'

const styles = StyleSheet.create({
  temperatureRequestButton: {
    margin: 10
  },
  roomTemperature: {
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flex: 1
  }
})

class Temperature extends Component {
  constructor(props) {
    super(props)
    this.setTemperature.bind(this)
  }

  componentDidMount = () => this.props.subscribeToTemperatureUpdates()

  closeDrawer = () => this.drawer._root.close()

  openDrawer = () => this.drawer._root.open()

  setTemperature = (temperature, request) => this.props.onUpdate({ temperature, request })

  location = (locationId) => locationId && this.props.locations && this.props.locations.find(location => location.id === locationId)

  render() {
    const { navigation, locations, users, user, temperatures, loading, errors } = this.props
    if (loading) {
      return <SpinnerComponent />
    } else if (errors) {
      console.log('Temperature error', errors)
      ErrorToast('Unable to load Temperature data', 'OK')
      return null
    }
    const location = this.location(user.overrideLocation || user.location)
    if (!location) {
      return null
    }
    const temperature = location && location.zone && temperatures && temperatures.find(temperature => temperature.id === location.zone)
    //console.log('Temperature', temperature)
    return (
      <Drawer ref={ref => this.drawer = ref}
        content={
          <Sidebar
            navigation={navigation}
            closeDrawer={this.closeDrawer}
            user={user}
            locations={locations}
            dispatch={this.props.dispatch}
          />
        }
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <HeaderComponent
            displayHeader={{ BackBtn: false, MenuBtn: true }}
            navigation={navigation}
            openDrawer={this.openDrawer}
          />
          <Content style={backgrounds.white}>
            <ListItem noBorder={!!temperature}>
              <Left style={components.flex1}>
                <H3>{location.name}</H3>
              </Left>
              <Right style={components.flex1}>
                {temperature && <Status temperature={temperature} />}
              </Right>
            </ListItem>
            {temperature &&
              <View style={styles.roomTemperature}>
                <Text style={styles.roomTemperature}>{Math.round(temperature.temperature)} &#8457;</Text>
              </View>
            }
            {temperature &&
              <View>
                <Button full style={[styles.temperatureRequestButton, backgrounds.orange]} onPress={() => this.setTemperature(temperature, 'heat')}><Text>Warm up this room</Text></Button>
                <Button full style={[styles.temperatureRequestButton, backgrounds.gray]} onPress={() => this.setTemperature(temperature, 'off')} ><Text>I'm feeling good</Text></Button>
                <Button full style={[styles.temperatureRequestButton, backgrounds.green]} onPress={() => this.setTemperature(temperature, 'cool')} ><Text>Cool down this room</Text></Button>
              </View>
            }
            {!temperature &&
              <ListItem iconLeft>
                <Icon type='MaterialCommunityIcons' name='alert' style={{ color: 'tomato', marginRight: 5, marginLeft: -5 }} />
                <Text>Temperature controls are not available at this location</Text>
              </ListItem>
            }
          </Content>
        </Container>
      </Drawer >
    )
  }
}

export default compose(
  Temperatures,
  SetTemperature,
  Users,
  Locations
)(connect(({ user }) => ({ user }))(Temperature))

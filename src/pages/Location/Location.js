import React, { Component } from 'react'
import { StyleSheet, Text, View, WebView, Dimensions } from 'react-native'
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Segment,
  Title,
  Left,
  Item,
  Input,
  Drawer
} from 'native-base'
import HeaderComponent from '../../headerComponent'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Users from '../../query/Users'
import Locations from '../../query/Locations'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Sidebar from '../../components/Sidebar'

class Location extends Component {
  constructor(props) {
    super(props)
    this.map = require('./map.html')
    const { height, width } = Dimensions.get('window')
    this.state = { height, width, view: 'map', search: '' }
  }
  layout() {
    const { height, width } = Dimensions.get('window')
    this.setState({ height, width })
  }
  closeDrawer = () => {
    this.drawer._root.close()
  }
  openDrawer = () => {
    this.drawer._root.open()
  }
  setupMap() {
    this.webview.injectJavaScript(`
    micelloMap.init('6qgXlhrPjWlGqEkMHIkpFLI1yNQ6YY', 24309, 31055, 51541, -180, {
      //Hide some icons to clean up the map
      s: {
          Table: { g: "" },
          Chair: { g: "" },
          Desk: { g: "" }
      }
    }, function () {
        //Add room labels
        micelloMap.addLabel(15713816, "Sora")
        micelloMap.addLabel(15713818, "Dave\'s Office")
        micelloMap.addLabel(15713819, "Ram\'s Office")
        micelloMap.addLabel(15713890, "Kiri")
        micelloMap.addLabel(15713842, "Kandha\'s Office")
        micelloMap.ready = true
        //Process queue
        micelloMap.processQueue()
    })`)
    this.componentDidUpdate()
  }
  micelloLocation(locationId) {
    if (locationId) {
      if (!this.locations) {
        this.locations = this.props.locations.reduce((locations, location) => {
          locations[location.id] = location.micello
          return locations
        }, {})
      }
      return this.locations && this.locations[locationId]
    }
  }
  componentDidUpdate() {
    if (this.webview) {
      //Highlight current user's location
      const currentUserLocation = this.micelloLocation(this.props.user.location)
      if (currentUserLocation) {
        this.webview.injectJavaScript(`micelloMap.highlightRoom(${currentUserLocation})`)
      }
      //Clear previous markers
      this.webview.injectJavaScript('micelloMap.clearGeometryOverlay()')
      //Add markers for all user locations
      this.filteredUsers().forEach(user => {
        const location = this.micelloLocation(user.location)
        if (location) {
          this.webview.injectJavaScript(`micelloMap.updateGeometryOverlay('${location}','${user.id}','${user.name}', '${user.type}')`)
        }
      })
    }
  }
  search(text) {
    if (text) {
      this.searchRegex = new RegExp(text, 'i')
    } else {
      delete this.searchRegex
    }
    this.setState({ search: text })
  }
  filteredUsers() {
    return this.searchRegex ? this.props.users.filter(user => this.searchRegex.test(user.name)) : this.props.users
  }
  render() {
    const { navigation, user, users, dispatch, locations } = this.props
    const { height, width } = this.state
    const locationNames = (locations && locations.reduce((locations, location) => {
      locations[location.id] = location.name
      return locations
    }, {})) || {}
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref
        }}
        content={
          <Sidebar
            navigation={navigation}
            closeDrawer={this.closeDrawer}
            user={user}
            locations={locations}
            dispatch={dispatch}
          />
        }
        onClose={this.closeDrawer.bind(this)}
      >
        <Container onLayout={this.layout.bind(this)}>
          {width < height && <HeaderComponent
            displayHeader={{ BackBtn: false, MenuBtn: true }}
            navigation={navigation}
            closeDrawer={this.closeDrawer}
            openDrawer={this.openDrawer}
          />}
          <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', marginLeft: -10, marginRight: -10 }}>
            <Item rounded style={{ flex: 2, marginLeft: 15, marginRight: 5, marginTop: 5, marginBottom: 10 }}>
              <Input placeholder='Search' style={{ height: 25 }} value={this.state.search} onChangeText={this.search.bind(this)} />
            </Item>
            <Segment style={{ flex: 1, marginLeft: 5, marginRight: 10, marginTop: 5, marginBottom: 10, backgroundColor: '#ffffff' }}>
              <Button first active={this.state.view === 'map'} onPress={() => this.setState({ view: 'map' })}><Icon size={16} name='map' color={this.state.view === 'map' ? '#ffffff' : '#007aff'} /></Button>
              <Button last active={this.state.view === 'table'} onPress={() => this.setState({ view: 'table' })}><Icon size={16} name='table' color={this.state.view === 'table' ? '#ffffff' : '#007aff'} /></Button>
            </Segment>
          </View>
          {this.state.view === 'map' ?
            <WebView
              source={this.map}
              style={{ height, width }}
              ref={ref => this.webview = ref}
              onLoad={this.setupMap.bind(this)}
            />
            :
            <Content style={{ backgroundColor: '#ffffff' }}>
              <TableRow>
                <TableHeader>Asset</TableHeader>
                <TableHeader>Location</TableHeader>
              </TableRow>
              {
                users && locations && this.filteredUsers().map((user, index) => (
                  <TableRow key={user.id} even={index % 2 === 0}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{(user.location && locationNames[user.location]) || 'Unknown'}</TableCell>
                  </TableRow>
                ))
              }
            </Content>}
        </Container >
      </Drawer>
    )
  }
}
const TableRow = props => <View style={{ flexDirection: 'row', backgroundColor: props.even ? '#efefef' : '#ffffff' }}>{props.children}</View>
const TableCell = props => <View style={{ flex: 1, padding: 10 }}><Text>{props.children}</Text></View>
const TableHeader = props => <View style={{ flex: 1, padding: 10 }}><Title style={{ textAlign: 'left' }}>{props.children}</Title></View>
export default compose(Users, Locations)(connect(({ user }) => ({ user }))(Location))

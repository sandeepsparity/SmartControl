import React from 'react'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Button,
  Body,
  Icon,
  Right,
  Header,
  Title,
  Left,
  Thumbnail,
  Radio
} from 'native-base'
import { logoutAction, overrideUserLocation } from '../actions/user'
import { StyleSheet, View } from 'react-native'
import icon from '../../icon.png'

const logout = (dispatch, navigation) => {
  logoutAction(dispatch)
  navigation.navigate('Login')
}
const setLocation = (overrideLocation, dispatch, close) => {
  overrideUserLocation({ overrideLocation }, dispatch)
  close()
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listHeader: {
    paddingTop: 10
  },
  logoutIcon: {
    fontSize: 14
  },
  logoutText: {
    width: 75
  }
})
export default ({ locations, user: { name, overrideLocation }, navigation, dispatch, closeDrawer: close }) =>
  <Container style={styles.container}>
    <Header style={styles.header}>
      <Thumbnail source={icon} small />
      <Title>FX Smart Building</Title>
    </Header>
    <Content>
      <List>
        <ListItem noBorder>
          <Left>
            <Text>Hi, {name}</Text>
          </Left>
          <Right>
            <Button iconLeft light small onPress={() => logout(dispatch, navigation)}>
              <Icon name='logout' type='MaterialCommunityIcons' style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem itemHeader style={styles.listHeader}>
          <Text>LOCATIONS</Text>
        </ListItem>
        <ListItem button onPress={() => setLocation(0, dispatch, close)}>
          <Body>
            <Text>Use My Location</Text>
          </Body>
          <Right>
            <Radio selected={!overrideLocation} />
          </Right>
        </ListItem>
        {
          [...locations].sort((a, b) => a.id - b.id).map(location =>
            <ListItem key={location.id} button onPress={() => setLocation(location.id, dispatch, close)}>
              <Body>
                <Text>{location.name}</Text>
              </Body>
              <Right>
                <Radio selected={location.id === overrideLocation} />
              </Right>
            </ListItem>
          )
        }
      </List>
    </Content>
  </Container>

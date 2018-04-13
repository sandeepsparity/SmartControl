import React, { Component } from 'react'
import { Header, Body, Title, Text, Button, Container, Content, Picker, Item, Form, Label, List, ListItem, Right, Radio } from 'native-base'
import Users from '../../query/Users'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/user';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  login() {
    if (this.state.userId) {
      loginAction(this.props.users.find(user => user.id === this.state.userId), this.props.dispatch)
      this.props.navigation.replace('App')
    }
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.navigation.replace('App')
    }
  }
  render() {
    const { users } = this.props
    return (
      <Container>
        <Header>
          <Body>
            <Title>FX Smart Building</Title>
          </Body>
        </Header>
        <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <List>
            <ListItem itemHeader first><Text>SELECT USER</Text></ListItem>
            {
              users && [...users].sort((a, b) => a.name.localeCompare(b.name)).map((user, index) =>
                (
                  <ListItem key={user.id} label={user.name} value={user.id} button onPress={() => this.setState({ userId: user.id })} last={index === users.length - 1} >
                    <Body>
                      <Text>{user.name}</Text>
                    </Body>
                    <Right>
                      <Radio selected={this.state.userId === user.id} />
                    </Right>
                  </ListItem>
                )
              )
            }
          </List>
          <Button block onPress={this.login.bind(this)} style={{ marginTop: 10 }} >
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect((user) => ({ ...user }))(compose(Users)(Login))
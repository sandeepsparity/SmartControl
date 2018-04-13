import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";

export default class HeaderComponent extends React.Component {
                 // state = {};
  render() {
    {
     /* Router Name : Displaying Route Name on Header */
    }
    const titleName = this.props.navigation.state.routeName;
    const { BackBtn, MenuBtn } = this.props.displayHeader;
    {
      /* Backbtn :  Hide or Show Backbtn - True or false */
    }
    const { goBack } = this.props.navigation;
    const leftArrow = BackBtn ? 
    <Button transparent>
       <Icon name="arrow-back" style={styles.iconColor} onPress={() => this.props.navigation.goBack()} />
    </Button> : null;
    {
     /* Hide or Show Menu Item - True or false */
    }

    const leftMenu = MenuBtn ? <Button transparent onPress={() => this.props.openDrawer()}>
                       <Icon name="menu" style={styles.iconColor}/>
                     </Button> : null;
    return (<Header style={styles.header}>
                       <Left>
                         {leftMenu}
                       </Left>
                       <Body>
                         <Title>{titleName}</Title>
                       </Body>
                       <Right>
                         </Right>
                      
                   </Header>);
  }
               }
const styles = StyleSheet.create({
  header:{
    display: 'flex',
  },
  iconColor:{
    color:'rgb(177,181,184)'
  }
});

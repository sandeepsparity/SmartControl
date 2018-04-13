import React, { Component } from "react";
import { StyleSheet, View, Image, Slider, NativeModules, ReactNative } from "react-native";
import {
  Button,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Switch,
  Spinner,
  Radio
} from "native-base";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./Style";
import SpinnerComponent from "../../common/spinner";
export default class LightingScenes extends React.Component {
  static propTypes = {
    group: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.id = this.props.group.id;
    this.scenesArray = []
  }
  shouldComponentUpdate = (nextProps) => {
    return true
  }
  /**
    * @description This function is for selecting a scene should toggle the power switch to on 
    *  and adjust the intensity level slider to the intensity for the scene and lastIntensity to previous intensity
     * @param {*} scene : object
     */
  updateScene(scene, event) {
    this.props.onSetLightingGroup({
      lightingGroup: {
        id: this.props.group.id,
        intensity: scene.intensity,
        network: this.props.group.network,
        lastIntensity: scene.intensity,
        scene: scene.id,
        fade: scene.fade || 0
      }
    });
    this.props.updateIntensity(scene.intensity);
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };
  render() {
    const { group: { scene: selectedScene, scenes } } = this.props;
    return (
      <List>
        <ListItem itemHeader>
          <Text>SCENES</Text>
        </ListItem>
        {
          [...scenes].sort((a, b) => a.intensity - b.intensity).map(scene =>
            <ListItem key={scene.id} onPress={event => this.updateScene(scene, event)} button>
              <Body>
                <Text>{scene.name}</Text>
              </Body>
              <Right>
                <Radio selected={selectedScene === scene.id} />
              </Right>
            </ListItem>
          )
        }
      </List>
    )
  }
}



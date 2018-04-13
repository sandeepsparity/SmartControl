import React, { Component } from "react";
import { StyleSheet, View, Slider, TextInput } from "react-native";
import { Button, Text, ListItem, Left, Body, Right, Switch, List } from "native-base";
import PropTypes from "prop-types";
import styles from "./Style";
/** 
 * @description :: This component will use to turn on/off the lights
*/
class LightingControls extends React.Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    // To know know whether location is same are different
    this.id = this.props.group.id;
    // To Track the intensity changed value is same with api response aren't
    this.intensityChange;
  }
  shouldComponentUpdate = (nextProps) => { return(this.id !== nextProps.group.id ? true : false)}
  /**
   *@description This function will do below things
   * 1) Setting the power to on should set intensity to lastIntensity or 50
   * 2) Setting the power to off should set lastIntensity to current intensity, intensity to 0 and scene to 0
   * @param {*} isEnabled : booloean
   * @param {*} group : Object
   */
  handlePower(isEnabled, group) {
    this.id = group.id;
    this._switch.setNativeProps({ value: isEnabled });
    // To unselect the scene
    this.props.updateScene()
    //this.eventTrigger = true;
    if (isEnabled) {
      group.intensity = group.lastIntensity || 50;
    } else {
      // setted to last intensity
      group.lastIntensity = group.intensity > 0 ? group.intensity : group.lastIntensity;
      group.intensity = 0;
    }
    this.intensityChange = group.intensity;
    this._slider.setNativeProps({ value: this.intensityChange });
    this._sliderValue.setNativeProps({ text: this.intensityChange + "%" });
    this.props.onSetLightingGroup({
      lightingGroup: {
        id: group.id,
        intensity: group.intensity,
        network: group.network,
        lastIntensity: group.lastIntensity,
        scene: 0
      }
    });
  }
  /**
    * @description This function is for changing the intensity slider should toggle the power switch to on, 
   scene to 0 and lastIntensity to previous intensity
    * @param {*} dimlevel number: intensity value
    * @param {*} group Object
    */
  handleIntensitylevel(dimlevel, group) {
    this.id = group.id
    this.eventTrigger = true;
    this.intensityChange = dimlevel;
    let isEnabled = this.intensityChange > 0 ? true : false
    this._switch.setNativeProps({ value: isEnabled });
    this.props.onSetLightingGroup({
      lightingGroup: {
        id: group.id,
        intensity: dimlevel,
        network: group.network,
        lastIntensity: group.intensity,
        scene: 0
      }
    });
  }
  /**
   * @description : This function will set for new intensity value
   * @param {*} dimval : number
   */
  setIntensity(dimval) {
    this._slider.setNativeProps({ value: dimval });
    this._sliderValue.setNativeProps({ text: dimval + "%" });
    // To unselect the scene
    this.props.updateScene()
  }

  render() {
    const { group, onSetLightingGroup } = this.props;
    const toggle = group.intensity > 0.1 ? true : false;
    this.id = group.id;
    const defaultSliderValue = group.intensity + "%";
    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text>CONTROL</Text>
        </ListItem>
        {group.lights &&
          <ListItem>
            <Body>
              <Text style={styles.textColor}>Power</Text>
            </Body>
            <Right>
              <Switch
                ref={component => (this._switch = component)}
                value={toggle}
                thumbTintColor="#FFFFFF"
                onTintColor="rgb(106, 194, 191)"
                style={styles.lightingSwitch}
                onValueChange={val => {
                  this.handlePower(val, group);
                }}
              />
            </Right>
          </ListItem>
        }
        {group.lights &&
          <ListItem style={styles.dimSlider}>
            <Body>
              <Text style={styles.textColor}>Intensity</Text>
            </Body>
            <Slider style={styles.dimSliderBody}
              ref={component => (this._slider = component)}
              step={1}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="rgb(106, 194, 191)"
              value={this.props.group.intensity}
              onValueChange={dimval => this.setIntensity(dimval)}
              onSlidingComplete={dimval =>
                this.handleIntensitylevel(dimval, group)
              }
            />
            <TextInput
              style={styles.dimSliderText}
              ref={component => (this._sliderValue = component)}
              editable={false}
              defaultValue={defaultSliderValue}
            />
          </ListItem>
        }
      </List>
    );
  }
}
export default LightingControls;

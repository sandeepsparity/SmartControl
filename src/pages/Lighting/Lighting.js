import React, { Component } from "react";
import { StyleSheet, View, Slider } from "react-native";
import {
  Container,
  Header,
  Drawer,
  Content,
  Button,
  List,
  Separator,
  ListItem,
  H3,
  Text,
  Icon,
  Left,
  Radio,
  Body,
  Right,
  Switch,
  CardItem,
  Card,
  Title
} from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { Fonts } from "../../utils/Fonts";
import HeaderComponent from "../../headerComponent";
import { postData } from "../../common/httpRequest";
import SpinnerComponent from "../../common/spinner";
import Sidebar from "../../components/Sidebar";
import { groups, scenes} from "../../query/Lighting";
import updateGroup from "../../mutation/Lighting";
import { ErrorToast } from "../../common/toast";
import Users from "../../query/Users";
import gql from "graphql-tag";
import { backgrounds, components } from "../../common/styles";
import LightingControls from "./LightingControls";
import LightingScenes from "./LightingScenes";
import users from "../../query/Users";
import locations from "../../query/Locations";
import { locationAction } from "../../actions/location";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
/**
 * @description : This component is main page for Lighting it contains
 * lighting controls and lighting scenes
 */
class Lighting extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    getLightingGroups: PropTypes.array,
    getLightingScenes: PropTypes.array,
    user: PropTypes.object
  };
  componentDidMount = () => {
    if ("subscribeToUpdateLightingGroup" in this.props) {
      this.props.subscribeToUpdateLightingGroup();
    }
  };

  /**
   * @description : This one will close the drawer
   */
  closeDrawer = () => {
    this.drawer._root.close();
  };
  /**
   * @description : This one will open the drawer
   */
  openDrawer = () => {
    this.drawer._root.open();
  };
  updateIntensity = intensity => {
    let isEnabled = intensity > 0.1 ? true : false;
    this._lightControls._slider.setNativeProps({ value: intensity });
    this._lightControls._sliderValue.setNativeProps({
      text: intensity + "%"
    });
    this._lightControls._switch.setNativeProps({ value: isEnabled });
  };
  updateScene = () => {
    let scenes = this._scenes.refs;
    for (let scene in scenes) {
      this._scenes.refs[scene].setNativeProps({ style: { height: 0 } });
    }
  };
  /**
   * @description Converting lighting group from object to array
   * @param array [] : This one contains lightingGroups[]
   * @param getLightingScenes [] : This one contains LightingScenes
   * @param keyField string: creating object with passed keyField ex: id, name
   * @returns {}
   */
  arrayToObject = (array, getLightingScenes, keyField) =>
    array.reduce((groupObj, item) => {
      groupObj[item[keyField]] = { ...item };
      groupObj[item[keyField]]["scenes"] = getLightingScenes;
      return groupObj;
    }, {});

  getLocation = locationId =>
    locationId &&
    this.props.locations.find(location => location.id === locationId);

  /**
   * @description This function will set Intensity to 50 and
   * Scene to 0 and lastIntensity to be the same as Intensity
   * @param group object
   */
  resetIntensity(group) {
    this.updateScene();
    this.updateIntensity(50.0);
    this.props.onSetLightingGroup({
      lightingGroup: {
        id: group.id,
        intensity: 50.0,
        network: group.network,
        lastIntensity: group.intensity,
        scene: 0
      }
    });
  }
  render() {
    const {
      navigation,
      getLightingGroups,
      getLightingScenes,
      groupsLoading,
      user,
      onSetLightingGroup,
      users,
      locations,
      groupsError,
      scenesError
    } = this.props;
    if (groupsError || !getLightingGroups || getLightingGroups.length === 0) {
      return <SpinnerComponent />;
    }
    const lightingObject = this.arrayToObject(
      getLightingGroups,
      getLightingScenes,
      "id"
    );
    const location = this.getLocation(user.overrideLocation || user.location)
    const group = (location && location.group && lightingObject[location.group]) || getLightingGroups[0];

    let roomStatus;
    if (group.motion) {
      //Check if Motion is older than 15 minutes
      const seconds = (new Date() - new Date(group.motion * 1000)) / 1000;
      roomStatus = seconds < 900 ? "OCCUPIED" : "VACANT";
    }
    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        content={
          <Sidebar
            navigation={navigation}
            closeDrawer={this.closeDrawer}
            user={user}
            locations={locations}
            dispatch={this.props.dispatch}
          />
        }
        onClose={this.closeDrawer.bind(this)}
      >
        <Container>
          <HeaderComponent
            displayHeader={{ BackBtn: false, MenuBtn: true }}
            navigation={navigation}
            closeDrawer={this.closeDrawer}
            openDrawer={this.openDrawer}
          />
          <Content style={backgrounds.white}>
            <ListItem noBorder>
              <Left>
                <H3>{location && location.name}</H3>
              </Left>
              <Right style = {components.flex1}>
                {roomStatus && (
                  <Text
                    style={[
                      components.label,
                      roomStatus === "VACANT"
                        ? backgrounds.green
                        : backgrounds.orange
                    ]}
                  >
                    {roomStatus}
                  </Text>
                )}
              </Right>
            </ListItem>
            {group && (
              <LightingControls
                group={group}
                ref={component => (this._lightControls = component)}
                onSetLightingGroup={onSetLightingGroup}
                updateScene={this.updateScene}
              />
            )}
            {group.lux && (
              <ListItem>
                <Body>
                  <Text>Lux</Text>
                </Body>
                <Right>
                  <Text>{Math.round(group.lux)} lx</Text>
                </Right>
              </ListItem>
            )}
            {group.power && (
              <ListItem>
                <Body>
                  <Text>Energy</Text>
                </Body>
                <Right>
                  <Text>{Math.round(group.power)} w</Text>
                </Right>
              </ListItem>
            )}
            {group &&
              group.lights && group.scenes && (
                <LightingScenes
                  group={group}
                  ref={component => (this._scenes = component)}
                  onSetLightingGroup={onSetLightingGroup}
                  updateIntensity={this.updateIntensity}
                />
              )}
            {group &&
              group.lights && (
                <View
                  style={{
                    marginTop: 20,
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row"
                  }}
                >
                  <Button full light onPress={() => this.resetIntensity(group)} style={{ margin: 10 }}>
                    <Text>Reset to defaults</Text>
                  </Button>
                </View>
              )}
            {group &&
              !group.lights && (
                <ListItem iconLeft>
                  <Icon type='MaterialCommunityIcons' name='alert' style={{ color: 'tomato', marginRight: 5, marginLeft: -5 }} />
                  <Text>Lighting controls are not available at this location</Text>
                </ListItem>
              )}
          </Content>
        </Container>
      </Drawer>
    );
  }
}
export default compose(
  groups,
  scenes,
  updateGroup,
  users,
  locations
)(connect(({ user }) => ({ user }))(Lighting));
window.onunhandledrejection = e => {
  ErrorToast("Unable to send your request");
};

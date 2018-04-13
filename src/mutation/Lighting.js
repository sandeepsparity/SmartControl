import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { ErrorToast } from '../common/toast';

const setLightingGroup = gql`mutation setLightingGroup($lightingGroup: LightingGroupInput!) {
  setLightingGroup(lightingGroup: $lightingGroup) {
    id
    name
    network
    lights
    sensors
    intensity
    lastIntensity
    scene
    lux
    temperature
    humidity
    motion
    power
  }
}`;
const getLightingGroups = gql`
  query getGroup {
    getLightingGroups {
      id
      name
      network
      lights
      sensors
      intensity
      lastIntensity
      scene
      lux
      temperature
      humidity
      motion
      power
    }
  }
`;
const onUpdateLightingGroup = gql`subscription
onUpdateLightingGroupSub {
  onUpdateLightingGroup {
    id
    name
    network
    lights
    sensors
    intensity
    lastIntensity
    scene
    lux
    temperature
    humidity
    motion
  }
}`;
export default graphql(setLightingGroup, {
  options: {
    refetchQueries: [{ query: getLightingGroups }],
    update: (dataProxy, { data: { setLightingGroup } }) => {
      const query = getLightingGroups;
      const data = dataProxy.readQuery({ query });
      data.getLightingGroups = data.getLightingGroups.map(
        group =>
          group.id !== setLightingGroup.id ? group : { ...setLightingGroup }
      );
      dataProxy.writeQuery({ query, data });
    }
  },
  props: props => ({
    onSetLightingGroup: onLightingGroupInput => {
      const updatedGroup = onLightingGroupInput.lightingGroup;
      let groups = props.ownProps.getLightingGroups;
      const { ...oldGroup } = groups.find(
        group => group.id === updatedGroup.id
      );
      oldGroup.lastIntensity = updatedGroup.lastIntensity;
      oldGroup.intensity = updatedGroup.intensity;
      oldGroup.scene = updatedGroup.scene;
      oldGroup.network = updatedGroup.network;
      props
        .mutate({
          variables: onLightingGroupInput,
          optimisticResponse: () => ({
            setLightingGroup: { ...oldGroup, __typename: "Post", version: 1 }
          })
        })
        .then(response => {
          if (response.errors) {
            ErrorToast("Unable to send your request");
          }
        })
        .catch(err => {
          console.log("Set Lighting Group Error", err);
          ErrorToast("Unable to send your request");
        });
    }
  })
})
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import cloneDeep from 'lodash/cloneDeep';
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
const GetLightingScenes = gql`
query getLightingScenes {
    getLightingScenes{
      id
      name
      intensity
      fade
    }
   }
`;
export const groups = graphql(getLightingGroups, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: ({ data: { getLightingGroups, loading, errors, subscribeToMore } }) => ({
    getLightingGroups,
    loading,
    errors,
    subscribeToUpdateLightingGroup: () => {
      subscribeToMore({
        document: onUpdateLightingGroup,
        updateQuery: (prev, next) => {
          const lightingGroups = _.cloneDeep([...prev.getLightingGroups], _.clone);
          const updatedGroup = next.subscriptionData.data.onUpdateLightingGroup;
          console.log('subscriptionData',next.subscriptionData.data.onUpdateLightingGroup);
          const oldGroup = lightingGroups.find(group => group.id === updatedGroup.id);
          for (var key in oldGroup) {
            oldGroup[key] = updatedGroup[key]
          }
          const updatedLightingGroup = {
            ...prev,
            getLightingGroups: lightingGroups
          };
          //console.log(updatedLightingGroup);
          return updatedLightingGroup;
        }
      })
    }
  })
});
export const scenes = graphql(GetLightingScenes, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data: { getLightingScenes, loading, errors } }) => ({
    getLightingScenes,
    loading,
    errors
  })
});


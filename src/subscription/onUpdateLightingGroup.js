import { graphql } from "react-apollo";
import gql from "graphql-tag";

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
}`

export default onUpdateLightingGroup;
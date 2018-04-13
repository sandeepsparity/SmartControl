import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getTemperatures = gql`
query {
  getTemperatures {
    id
    name
    temperature
    status,
    lastRequest,
    pressure,
    lastRequestTimestamp,
    setPoint
  }
}`
const onUpdateTemperature = gql`
subscription {
  onUpdateTemperature {
    id
    name
    temperature
    status,
    lastRequest,
    pressure,
    lastRequestTimestamp,
    setPoint
  }
}`

export default graphql(getTemperatures, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: ({ data: { getTemperatures: temperatures, loading, errors, subscribeToMore } }) => ({
    temperatures,
    loading,
    errors,
    subscribeToTemperatureUpdates: () => {
      subscribeToMore({
        document: onUpdateTemperature,
        updateQuery: (prev, next) => {
          //Merge updates to temperature
          const temperatures = [...prev.getTemperatures]
          const updatedTemperature = next.subscriptionData.data.onUpdateTemperature
          const oldTemperature = temperatures.find(temperature => temperature.id === updatedTemperature.id)
          for (var key in oldTemperature) {
            oldTemperature[key] = updatedTemperature[key]
          }
          return {
            ...prev,
            getTemperatures: temperatures
          }
        }
      })
    }
  })
})


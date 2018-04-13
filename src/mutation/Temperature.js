import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { ErrorToast } from '../common/toast';

const setTemperatureRequest = gql`
mutation 
setTemperatureRequest ($id: Int!, $request: TemperatureRequest!)
{ 
  setTemperatureRequest(id: $id, request: $request) 
  { 
    id 
    name 
    setPoint 
    temperature 
    pressure 
    status 
    lastRequest 
    lastRequestTimestamp 
  } 
}`
export default graphql(setTemperatureRequest, {
  props: props => ({
    onUpdate: ({ temperature, request }) => {
      props
        .mutate({
          variables: {
            id: temperature.id,
            request
          },
          optimisticResponse: {
            setTemperatureRequest: {
              ...temperature,
              lastRequest: request
            }
          }
        }).then(({ errors }) => {
          if (errors) {
            console.log('setTemperature mutation failed', errors)
            ErrorToast('Unable to send your request')
          }
        }).catch(error => {
          console.log("setTemperature mutation failed", error)
          ErrorToast('Unable to send your request')
        })
    }
  })
})
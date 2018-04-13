import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
const UpdateUserLocation = gql`mutation UpdateUserLocation($userId:Int!, $locationId:Int!) {
    updateUserLocation(userId: $userId, locationId: $locationId) {
        id
        location
    }
}`
export default graphql(UpdateUserLocation, {
    props: props => ({
        updateUserLocation: (userId, locationId) => props.mutate({
            variables: { userId, locationId }
        })
    })
})
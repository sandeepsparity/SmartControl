import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
export default graphql(
    gql`query GetLocations {
    getLocations {
        id
        name
        group
        major
        zone
        micello
    }}`, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: ({ data }) => ({
            loading: data.loading,
            locations: data.getLocations,
            locationsError:data.error
        })
    })
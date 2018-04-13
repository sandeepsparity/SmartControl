import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const GetUsers = gql`query GetUsers {
    getUsers {
        id
        name
        location
        type
    }}`
const OnUpdateUserLocation = gql`subscription OnUpdateUserLocation {
    onUpdateUserLocation {
        id
        location
    }
}`
export default graphql(
    GetUsers, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: ({ data }) => ({
            loading: data.loading,
            users: data.getUsers,
            subscribeToUserLocationUpdates: () => {
                data.subscribeToMore({
                    document: OnUpdateUserLocation,
                    updateQuery: (prev, next) => {
                        //Merge updates to user location
                        const users = [...prev.getUsers]
                        const updatedUser = next.subscriptionData.data.onUpdateUserLocation
                        const oldUser = users.find(user => user.id === updatedUser.id)
                        oldUser.location = updatedUser.location
                        const updatedUsers = {
                            ...prev,
                            getUsers: users
                        }
                        return updatedUsers
                    }
                })
            }
        })
    },
)
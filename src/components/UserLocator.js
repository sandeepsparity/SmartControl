import beacons from 'react-native-ibeacons'
import { DeviceEventEmitter } from 'react-native'
import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo';
import users from '../query/Users';
import locations from '../query/Locations';
import updateUserLocation from '../mutation/User'
import { ErrorToast } from '../common/toast';
import { userLocationAction } from '../actions/user';

class UserLocator extends Component {
    componentDidMount() {
        if ('subscribeToUserLocationUpdates' in this.props) {
            this.props.subscribeToUserLocationUpdates()
        }
        if (beacons) {
            const { users, locations, user } = this.props
            const region = {
                identifier: 'FXPAL SB',
                uuid: 'F6DEFC3D-0F45-4877-A51D-C95875801083'
            }
            const beaconLocations = locations && 'reduce' in locations && locations.reduce((locations, location) => {
                locations[location.major] = location
                return locations
            }, {})
            beacons.requestAlwaysAuthorization()
            beacons.startMonitoringForRegion(region)
            beacons.startRangingBeaconsInRegion(region)
            beacons.startUpdatingLocation()
            let lastLocation
            if (beaconLocations) {
                DeviceEventEmitter.addListener('beaconsDidRange', data => {
                    //find the strongest beacons by strength
                    const beacon = data.beacons.reduce((max, current) => current.rssi !== 0 && max.rssi < current.rssi ? current : max, { rssi: -101 })
                    if ('major' in beacon) {
                        if (!lastLocation || lastLocation != beacon.major) {
                            lastLocation = beacon.major
                            const location = beaconLocations[lastLocation]
                            if (location) {
                                console.log('Location', location.name, 'RSSI', beacon.rssi, 'Beacons', data.beacons)
                                if (user.id) {
                                    this.props.updateUserLocation(user.id, location.id).then(() => {
                                        userLocationAction({ location: location.id }, this.props.dispatch)
                                    }).catch((error) => {
                                        console.log('Unable to update user location', error)
                                        ErrorToast('Unable to update user location')
                                    })
                                }
                            } else {
                                console.log('Beacon with unknown Major', beacon)
                            }
                        }
                    }
                })
            }
        } else {
            console.log('Unable to start beacon ranging. Are we in a simulator?')
        }
    }
    render() {
        return null
    }
}
export default compose(users, locations, updateUserLocation)(connect(({ user }) => ({ user }))(UserLocator))
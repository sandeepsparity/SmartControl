import React from 'react'
import { Text } from 'native-base'
import { components, backgrounds } from '../../common/styles'

const requestText = {
  heat: 'WARMING REQUESTED',
  cool: 'COOLING REQUESTED',
  off: 'TURNING OFF'
}
const statusText = {
  heating: 'WARMING UP',
  cooling: 'COOLING DOWN',
  off: 'OFF'
}
const statusStyles = {
  heating: backgrounds.orange,
  cooling: backgrounds.green,
  off: backgrounds.gray
}
export default ({ temperature: { status, lastRequest: request } }) => <Text style={[components.label, statusStyles[status]]}>{request === 'none' || request.indexOf(status) === 0 ? statusText[status] : requestText[request]}</Text>


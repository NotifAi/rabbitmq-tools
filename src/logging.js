import { yellow, red, blue, grey } from 'chalk'

const formatId = message => `{${yellow(message.properties.correlationId.slice(0, 8))}}`

export const formatEvent = routingKey => `Event '${blue(routingKey)}' published`

export const formatOutgoingRequest = (correlationId, routingKey, appId) => [
  `{${yellow(correlationId.slice(0, 8))}}`,
  `Request '${blue(routingKey)}'`,
  `sent by '${blue(appId)}'`
].join(' ')

export const formatIncomingRequest = message => [
  `${formatId(message)}`,
  `Received request '${yellow(message.fields.routingKey)}'`,
  `from '${yellow(message.properties.appId)}'`
].join(' ')

export const formatIncomingEvent = message => [
  `Received event '${yellow(message.fields.routingKey)}'`,
  `published by '${yellow(message.properties.appId)}'`
].join(' ')

export const formatIncomingMessage = message => (message.properties.correlationId ?
  formatIncomingRequest(message) :
  formatIncomingEvent(message))

export const formatOutgoingError = (message, error) => [
  `${formatId(message)}`,
  `Error '${red(error.toString())}'`,
  `sent to '${red(message.properties.replyTo)}'`,
  `as response to '${red(message.properties.appId)}'`
].join(' ')

export const formatSubscriptionError = (message, error) => [
  `Error '${red(error.toString())}'`,
  `on event '${yellow(message.fields.routingKey)}'`,
  `emitted by '${yellow(message.properties.appId)}'`
].join(' ')

export const formatOutgoingResponse = (message, error) => (error ?
  formatOutgoingError(message, error) :
  [
    `${formatId(message)}`,
    `Response for '${blue(message.properties.appId)}'`,
    `sent to '${blue(message.properties.replyTo)}'`
  ].join(' '))

export const formatIncomingError = (message, error) => [
  `${formatId(message)}`,
  `Error '${red(error.toString())}'`,
  `received from '${red(message.properties.appId)}'`
].join(' ')

export const formatIncomingResponse = (message, error) => (error ?
  formatIncomingError(message, error) :
  [
    `${formatId(message)}`,
    `Received response '${yellow(message.fields.routingKey)}'`,
    `from '${yellow(message.properties.appId)}'`
  ].join(' '))

export const formatMeta = (source, message) => {
  const time = new Date().toTimeString().split(' ')[0]

  return `[${grey(time)}] [${source}] ${message}`
}

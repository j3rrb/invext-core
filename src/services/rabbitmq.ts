import amqp from 'amqplib'
import { Channel, Connection } from 'amqplib'
import { MAIN_EXCHANGE_NAME } from '../constants'

export class RabbitMQService {
  private static _instance: RabbitMQService
  private _connection: Connection | undefined
  private _channel: Channel | undefined

  private constructor() {}

  get connection() {
    return this._connection
  }

  get channel() {
    return this._channel
  }

  set connection(connection: Connection | undefined) {
    this._connection = connection
  }

  set channel(channel: Channel | undefined) {
    this._channel = channel
  }

  static getInstance(): RabbitMQService {
    if (this._instance) return this._instance

    this._instance = new RabbitMQService()

    return this._instance
  }

  async connect() {
    this.connection = await amqp.connect({
      hostname: process.env.RABBIT_HOSTNAME,
      username: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
      port: Number(process.env.RABBIT_PORT),
      protocol: process.env.RABBIT_PROTO,
      vhost: process.env.RABBIT_VHOST,
    })

    console.log('RabbitMQ conectado!')

    this.channel = await this.connection.createChannel()

    await this.channel.assertExchange(MAIN_EXCHANGE_NAME, 'direct', {
      durable: true,
    })

    console.log(`Exchange ${MAIN_EXCHANGE_NAME} disponível!`)
  }

  async closeChannel() {
    await this._channel?.close()
  }

  async closeConnection() {
    await this._channel?.close()
  }
}

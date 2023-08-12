import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IQueue } from '../interfaces'

export class RabbitMQHttpService {
  private static _instance: RabbitMQHttpService | undefined
  private readonly _axios: AxiosInstance

  private constructor() {
    this._axios = axios.create({
      baseURL: `http://${process.env.RABBIT_HOSTNAME}:${process.env.RABBIT_HTTP_PORT}/api`,
      auth: {
        username: String(process.env.RABBIT_USERNAME),
        password: String(process.env.RABBIT_PASSWORD),
      },
    })
  }

  get axios(): AxiosInstance {
    return this._axios
  }

  static getInstance(): RabbitMQHttpService {
    if (this._instance) return this._instance

    this._instance = new RabbitMQHttpService()

    return this._instance
  }

  async getQueues() {
    const { data }: AxiosResponse<IQueue[]> = await this._axios.get('/queues')

    return data
  }
}

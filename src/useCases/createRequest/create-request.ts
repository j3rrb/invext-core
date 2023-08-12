import { EDepartmentsTypes } from '../../enums'
import { IUseCase } from '../../interfaces'
import { RabbitMQService } from '../../services/rabbitmq'
import { RabbitMQHttpService } from '../../services/rabbitmq_http'
import { CreateRequestError } from './errors'

export class CreateRequestUseCase implements IUseCase {
  constructor(
    private readonly rabbit: RabbitMQService,
    private readonly http: RabbitMQHttpService,
  ) {}

  async execute(
    subject: string,
    data: any,
    department?: `${EDepartmentsTypes}`,
  ): Promise<string> {
    try {
      const queues = await this.http.getQueues()

      const [targetQueue] = queues
        .filter(queue => {
          const pattern = new RegExp(`^${department ?? 'outros'}`, 'g')

          return pattern.test(queue.name)
        })
        .sort((a, b) => a.messages - b.messages)

      await this.rabbit.channel?.sendToQueue(
        targetQueue.name,
        Buffer.from(
          JSON.stringify({
            subject,
            data,
          }),
        ),
      )

      console.log(
        `Requisição criada: ${JSON.stringify({ department, subject, data })}`,
      )

      return targetQueue.name
    } catch (error) {
      throw new CreateRequestError(error)
    }
  }
}

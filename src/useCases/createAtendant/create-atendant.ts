import { ATENDANT_QUEUE_MAX_LENGTH, MAIN_EXCHANGE_NAME } from '../../constants'
import { Atendant } from '../../entities/Atendant'
import { IUseCase } from '../../interfaces'
import { RabbitMQService } from '../../services/rabbitmq'

export class CreateAtendantUseCase implements IUseCase {
  constructor(private rabbit: RabbitMQService) {}

  async execute(atendant: Atendant) {
    const queueName = atendant.makeQueueName()

    await this.rabbit.channel?.assertQueue(queueName, {
      durable: true,
      maxLength: ATENDANT_QUEUE_MAX_LENGTH,
    })

    await this.rabbit.channel?.bindQueue(
      queueName,
      MAIN_EXCHANGE_NAME,
      atendant.department,
    )

    console.log(`Fila ${queueName}, exchange ${MAIN_EXCHANGE_NAME} disponível!`)
  }
}

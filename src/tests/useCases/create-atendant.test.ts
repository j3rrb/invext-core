import { Atendant } from '../../entities/Atendant'
import { RabbitMQService } from '../../services/rabbitmq'
import { CreateAtendantUseCase } from '../../useCases/createAtendant/create-atendant'
import * as dotenv from 'dotenv'

let rabbit: RabbitMQService

beforeAll(async () => {
  dotenv.config()
  rabbit = RabbitMQService.getInstance()
  await rabbit.connect()

  return async () => {
    await rabbit.closeChannel()
    await rabbit.closeConnection()
  }
})

test("[01] - Deve criar um atendente do departamento 'cartoes' e de nome 'atendente_cartoes'", async () => {
  const atendant = new Atendant('atendente_cartoes', 'cartoes')
  await rabbit.channel?.deleteQueue(atendant.makeQueueName())

  await new CreateAtendantUseCase(rabbit).execute(atendant)

  await expect(
    rabbit.channel?.checkQueue(atendant.makeQueueName()),
  ).resolves.not.toThrowError()
})

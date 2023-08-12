import { RabbitMQService } from '../../services/rabbitmq'
import { RabbitMQHttpService } from '../../services/rabbitmq_http'
import { CreateRequestUseCase } from '../../useCases/createRequest/create-request'
import * as dotenv from 'dotenv'

let rabbit: RabbitMQService
let http: RabbitMQHttpService

beforeAll(async () => {
  dotenv.config()
  rabbit = RabbitMQService.getInstance()
  http = RabbitMQHttpService.getInstance()
  await rabbit.connect()

  return async () => {
    await rabbit.closeChannel()
    await rabbit.closeConnection()
  }
})

test("[01] - Deve criar uma requisição ao departamento 'cartoes', com o assunto 'teste', e a fila com menor quantidade de mensagens deverá receber a requisição", async () => {
  const useCase = new CreateRequestUseCase(rabbit, http)

  await await expect(
    useCase.execute('teste', 'teste', 'cartoes'),
  ).resolves.not.toThrowError()
})

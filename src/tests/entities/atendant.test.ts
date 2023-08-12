import { Atendant } from '../../entities/Atendant'

test('Deve gerar o seguinte nome de fila: cartoes.atendant.atendente_joao', () => {
  const atendant = new Atendant('atendente_joao', 'cartoes')

  expect(atendant.makeQueueName()).toBe('cartoes.atendant.atendente_joao')
})

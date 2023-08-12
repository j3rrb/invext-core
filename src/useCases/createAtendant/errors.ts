export class CreateAtendantError extends Error {
  constructor(msg: string) {
    super(`Erro ao criar atendente: ${msg}`)
  }
}

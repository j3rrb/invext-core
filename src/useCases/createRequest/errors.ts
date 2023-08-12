export class CreateRequestError extends Error {
  constructor(msg: any) {
    super(`Erro ao criar requisição: ${msg}`)
  }
}

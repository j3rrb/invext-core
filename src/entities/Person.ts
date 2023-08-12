import { EPersonTypes } from '../enums'

export class Person {
  name: string
  type: `${EPersonTypes}`

  constructor(name: string, type: `${EPersonTypes}`) {
    this.type = type
    this.name = name
  }
}

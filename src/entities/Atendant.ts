import { Person } from './Person'
import { EDepartmentsTypes } from '../enums'

export class Atendant extends Person {
  department: `${EDepartmentsTypes}`

  constructor(name: string, department: `${EDepartmentsTypes}`) {
    super(name, 'atendant')

    this.department = department
  }

  makeQueueName() {
    return `${this.department}.${this.type}.${this.name}`
  }
}

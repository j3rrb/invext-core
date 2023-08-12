export interface IUseCase {
  execute(...parameters: any): Promise<any> | any
}

export interface IQueue {
  arguments: Object[]
  auto_delete: boolean
  backing_queue_status: Object[]
  consumer_capacity: number
  consumer_utilisation: number
  consumers: number
  durable: boolean
  effective_policy_definition: Object
  exclusive: boolean
  exclusive_consumer_tag: string | null
  garbage_collection: Object[]
  head_message_timestamp: null
  idle_since: '2023-08-11T18:25:03.991+00:00'
  memory: 8992
  message_bytes: number
  message_bytes_paged_out: number
  message_bytes_persistent: number
  message_bytes_ram: number
  message_bytes_ready: number
  message_bytes_unacknowledged: number
  messages: number
  messages_details: Object[]
  messages_paged_out: number
  messages_persistent: number
  messages_ram: number
  messages_ready: number
  messages_ready_details: Object[]
  messages_ready_ram: number
  messages_unacknowledged: number
  messages_unacknowledged_details: Object[]
  messages_unacknowledged_ram: number
  name: string
  node: string
  operator_policy: null
  policy: null
  recoverable_slaves: null
  reductions: number
  reductions_details: Object[]
  single_active_consumer_tag: string | null
  state: string
  type: string
  vhost: string
}

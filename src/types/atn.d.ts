import { BigNumber } from 'bignumber.js'

declare interface EndPoint {
  action: string
  uri: string
  price: number
}

declare interface DbotInfo {
  id: number
  addr: string
  name: string
  domain: string
  endPoints: EndPoint[]
}

declare interface Dbot {
  id: number
  addr: string
  intro?: string
}

declare interface ChannelInfo {
  state: string
  block: number
  deposit: BigNumber
  withdrawn: BigNumber
}

declare interface AiResponse {
  code: string
  msg: string
  error: string
}

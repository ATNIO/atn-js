import BN from 'bn.js'

export interface EndPoint {
  method: string
  uri: string
  price: number
}

export interface Dbot {
  id: number
  addr: string
  name: string
  domain: string
  endPoints: EndPoint[]
}

// export interface ChannelInfo {
//   state: string
//   block: number
//   deposit: BN
//   withdrawn: BN
// }

export interface AiResponse {
  code: string
  msg: string
  error: string
}

export interface Proof {
  balance: number
  sig?: string;
}

export interface MsgParam {
  type: string
  name: string
  value: string
}

export interface MsgResponse {
  status: number
  msg: string
  data: any
}


export interface ChannelInfo {
  key: string
  deposit: BN
  blockNumber: number

  receiver: string
  sender: string
  balance: BN
}

export interface Flag {
   flag:boolean
   startTime: number
   loopTime: number
}

export interface ChannelSettledArgs {
  senderAddress: string
  receiverAddress: string
  blockNumber: number
}

export interface AIParam {
  dbotAddress: string
}




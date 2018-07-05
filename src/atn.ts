import { BigNumber } from 'bignumber.js'
import { Web3, ABIDefinition, Contract } from './types/web3.d'
import { Dbot, DbotInfo, ChannelInfo, AiResponse } from './types/atn.d'

class Atn {
  decimals: number = 18

  constructor(
    web3: string | { currentProvider: any },
    contractAddr: string,
    contractABI: ABIDefinition[]
  ) {}
}

export default Atn

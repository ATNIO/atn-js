import { AxiosRequestConfig } from 'axios'
import { ChannelInfo, Flag, Dbot, MsgParam, MsgResponse } from '../typings/atn'
import { Account } from '../node_modules/@types/web3/eth/accounts.d'
import TransferChannelJson from './contracts/channel/transferChannels.json'
import DbotJson from './contracts/dbot/dbot.json'
import DbotFactoryJson from './contracts/dbot/dbotFactory.json'
import { DevelopENV, PreleaseEnv, ProductENV } from './common'
import {
  CallAPIException1,
  CallAPIException2,
  CallAPIException3,
  CallAPIEXception4,
  CloseChannelException1,
  CloseChannelException2,
  CreateChannelException,
  GetChannelDetailException1,
  GetChannelDetailException2,
  GetChannelDetailException3,
  RequestCloseSignatureException2,
  WaitTxException
} from './exceptionStatus'

const Web3 = require('web3')
const axios = require('axios')

const BN = Web3.utils.BN

/**
 * Convert a callback-based func to return a promise
 *
 * It'll return a function which, when called, will pass all received
 * parameters to the wrapped method, and return a promise which will be
 * resolved which callback data passed as last parameter
 *
 * @param obj  A object containing the method to be called
 * @param method  A method name of obj to be promisified
 * @returns  A method wrapper which returns a promise
 */
function promisify<T>(obj: any, method: string): (...args: any[]) => Promise<T> {
  return (...params) =>
    new Promise((resolve, reject) =>
      obj[method](...params, (err: any, res: any) => (err ? reject(err) : resolve(res)))
    )
}

/**
 * Async sleep: returns a promise which will resolve after timeout
 *
 * @param timeout  Timeout before promise is resolved, in milliseconds
 * @returns  Promise which will be resolved after timeout
 */

function asyncSleep(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * Encode strings and numbers as hex, left-padded, if required.
 *
 * 0x prefix not added,
 *
 * @param val  Value to be hex-encoded
 * @param zPadLength  Left-pad with zeroes to this number of characters
 * @returns  hex-encoded value
 */

// extends
class Atn {
  readonly web3: any

  readonly dmc: any

  readonly dfmc: any

  readonly tcmc: any

  readonly decimals: number = 18

  readonly defaultBlockNumber: number = 1

  readonly hyperProtocolType: string = 'https'

  readonly PRODUCT_ENV: string = ProductENV.env

  readonly DEVELOP_ENV: string = DevelopENV.env

  readonly PRELEASE_ENV: string = PreleaseEnv.env

  dbotDefaultAddress: string = '0x0000000000000000000000000000000000000011'

  dbotFactoryDefaultAddress: string = '0x0000000000000000000000000000000000000011'

  tcmcDefaultAddress: string = '0x0000000000000000000000000000000000000012'

  constructor(web3: any, env?: string) {
    this.web3 = new Web3(web3.currentProvider)
    if (typeof web3 === 'string') {
      this.web3.setProvider(new this.web3.providers.HttpProvider(web3))
    } else if (web3.currentProvider) {
      this.web3.setProvider(web3.currentProvider)
    } else {
      throw new Error('Invalid web3 provider')
    }
    // 构造使用时
    if (env && typeof env === 'string' && env.toLowerCase() !== this.PRODUCT_ENV) {
      this.hyperProtocolType = 'http'
    }

    this.dmc = new this.web3.eth.Contract(DbotJson.abi, this.dbotDefaultAddress)

    this.dfmc = new this.web3.eth.Contract(DbotFactoryJson.abi, this.dbotFactoryDefaultAddress)

    this.tcmc = new this.web3.eth.Contract(TransferChannelJson.abi, this.tcmcDefaultAddress)
  }

  /**
   * @method Web3 Method - addAccount
   * @desc
   *
   * @param {string | Account} account
   */
  addAccount(account: string | Account) {
    this.web3.eth.accounts.wallet.add(account)
  }

  /**
   * @method Web3 Method - setDefaultAccount
   * @desc
   *
   * @param {string} addr
   */
  setDefaultAccount(addr: string) {
    this.web3.eth.defaultAccount = addr
  }

  handlerDbotDomain(domain: string, hyperProtocolType: string): string {
    const result = domain.toLowerCase().startsWith('http')
      ? domain
      : hyperProtocolType.concat('://').concat(domain)
    return result
  }

  /**
   * @method DobotFactory Method - register
   * @desc
   *
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  register(dbotAddress: string, from: string): any {
    return this.dfmc.methods.register(dbotAddress).send({ from })
  }

  /**
   * @method DobotFactory Method - idToAddress
   * @desc
   * @param {number} dbotId
   * @returns {any}
   */
  idToAddress(dbotId: number, from: string): any {
    return this.dfmc.methods.idToAddress(dbotId).call({ from })
  }

  // OLD API NO USE START
  /**
   * @method Dbot Method - changeName
   * @desc
   *
   * @param {string} name
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  changeName(name: string, dbotAddress: string, from: string): any {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return initialDbot.methods.changeName(name).send({ from })
  }

  /**
   * @method Dbot Method - chagneDomain
   * @desc
   *
   * @param {string} domain
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  changeDomain(domain: string, dbotAddress: string, from: string): any {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return initialDbot.methods.changeDomain(domain).send({ from })
  }

  /**
   * @method Dbot Method - addEndPoint
   * @desc
   *
   * @param {string} action
   * @param {string} price
   * @param {string} uri
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  addEndPoint(action: string, price: string, uri: string, dbotAddress: string, from: string): any {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return initialDbot.methods.addEndPoint(action, price, uri).send({ from })
  }

  /**
   * @method Dbot Method - updateEndPoint
   * @desc
   *
   * @param {string} action
   * @param {string} price
   * @param {string} uri
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  updateEndPoint(method: string, price: string, uri: string, dbotAddress: string, from: string) {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return initialDbot.methods.updateEndPoint(method, price, uri).send({ from })
  }

  /**
   * @method Dbot Method - deleteEndPoint
   * @desc
   *
   * @param {string} action
   * @param {string} uri
   * @param {string} dbotAddress
   * @param {string} from
   * @returns {any}
   */
  deleteEndPoint(action: string, uri: string, dbotAddress: string, from: string) {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return initialDbot.methods.deleteEndPoint(action, uri).send({ from })
  }

  getVersion(from: string): any {
    return this.tcmc.methods.version().call({ from })
  }

  /**
   * @method TransferChannel Method - ownerAddress
   * @desc
   *
   * @param {string} transferChannelContract
   * @returns {any}
   */
  getOwnerAddress(transferChannelContract: string): any {
    const rmtc = new this.web3.eth.Contract(TransferChannelJson.abi, transferChannelContract)
    return rmtc.methods.ownerAddress().call()
  }

  /**
   * @method TransferChannel Method - getKey
   * @desc
   *
   * @param {string} senderAddress
   * @param {string} receiveAddress
   * @param {number} blockNumber
   * @param {string} from
   * @returns {Promise<any>}
   */
  async getKey(senderAddress: string, receiveAddress: string, blockNumber: number, from: string) {
    return this.tcmc.methods.getKey(senderAddress, receiveAddress, blockNumber).call({ from })
  }

  /**
   * @method TransferChannel Method - GetChannels
   * @desc
   *
   * @param {string} channelKey
   * @param {string} from
   * @returns {any}
   */
  keyToChannel(channelKey: string, from: string): any {
    return this.tcmc.methods.channels(channelKey).call({ from })
  }

  /**
   * @method TransferChannel Method - getWithdrawbalance
   * @desc
   *
   * @param {string} key
   * @param {string} from
   * @returns {any}
   */
  getWithdrawbalance(key: string, from: string): any {
    return this.tcmc.methods.withdrawn_balances(key).call({ from })
  }

  /**
   * @method TransferChannel Method - withdraw
   * @desc
   *
   * @param {number} blockNumber
   * @param {number} balance
   * @returns {PromiEvent<any>}
   */
  async withdraw(receiverAddress: string, blockNumber: number, balance: string, from: string) {
    const signature = this.getBanlanceSign(receiverAddress, balance, from)
    return this.tcmc.methods.withdraw(blockNumber, balance, signature).send({ from })
  }

  /**
   * @method TransferChannel Method - closingRequests
   * @desc
   *
   * @param {string} key
   * @param {string} from
   * @returns {any}
   */
  getClosingRequests(key: string, from: string): any {
    return this.tcmc.methods.closing_requests(key).call({ from })
  }

  /**
   * @method TransferChannel Method - topUpdateDelegate
   * @desc
   *
   * @param {string} senderAddress
   * @param {string} receiverAddress
   * @param {number} blockNumber
   * @param {string} value
   * @param {string} from
   * @returns {PromiEvent<any>}
   */
  topUpdateDelegateChannel(
    senderAddress: string,
    receiverAddress: string,
    blockNumber: number,
    value: string,
    from: string
  ): any {
    return this.tcmc.methods
      .topUpDelegate(senderAddress, receiverAddress, blockNumber)
      .send({ from, value })
  }

  /**
   * @method TransferChannel Method - settleChannel
   * @desc
   *
   * @param {string} receiveAddress
   * @param {number} blockNumber
   * @param {string} from
   * @returns {PromiEvent<any>}
   */
  settleChannel(receiveAddress: string, blockNumber: number, from: string) {
    return this.tcmc.methods.settle(receiveAddress, blockNumber).send({ from })
  }

  /**
   * @method TransferChannel Method - uncooperativeClose
   * @desc
   *
   * @param {string} receiveAddress
   * @param {number} blockNumber
   * @param {number} balance
   * @param {string} from
   * @returns {PromiEvent<any>}
   */
  uncooperativeClose(receiveAddress: string, blockNumber: number, balance: number, from: string) {
    return this.tcmc.methods.uncooperativeClose(receiveAddress, blockNumber, balance).send({ from })
  }

  // OLD API NO USE END

  // NEW API START

  /**
   * 获取当前账户连接的id
   */
  async getCurrentNetworkId(): Promise<number> {
    return this.web3.eth.net.getId()
  }

  /**
   *
   * @param {string} dbotAddress
   * @returns {Promise<string>}
   */
  async getDbotDomain(dbotAddress: string, from: string) {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return Web3.utils.hexToString(await initialDbot.methods.domain().call({ from }))
  }

  /**
   *
   * @param {string} dbotAddress
   * @returns {Promise<string>}
   */
  async getDbotName(dbotAddress: string, from: string) {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    return Web3.utils.hexToString(await initialDbot.methods.name().call({ from }))
  }

  /**
   * @method DbotContract Method - getEnnPointPrice
   * @descri 根据dbot地址、uri、method获取 endpoint的price
   *
   * @param {string} dbotAddress
   * @param {string} receiverAddress ()
   * @param {string} senderAddress
   * @param {string} method
   * @param {string} uri
   * @param {string} from
   * @returns {Promise<number>}
   */
  async getEndPointPrice(dbotAddress: string, method: string, uri: string, from: string) {
    const initialDbot = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    const channelKey = await initialDbot.methods
      .getKey(Web3.utils.utf8ToHex(method), Web3.utils.utf8ToHex(uri))
      .call({ from })
    const endPoint = await initialDbot.methods.keyToEndPoints(channelKey).call({ from })
    return endPoint.price
  }

  /**
   * @method TransferChannelContract Method - challengePeriod
   * @descri 根据channel地址获取 channel的period
   *
   * @param {string} from
   * @returns {any}
   */
  async getChannelPeriod(from: string) {
    return this.tcmc.methods.challengePeriod().call({ from })
  }

  /**
   * @method Channel Method - getChannelInfo
   * @desc   从链上获取获取已经建立的Channel的信息
   *
   * @param {string} senderAddress
   * @param {string} receiverAddress
   * @param {number} blockNumber
   * @param {string} from
   * @returns {PromiEvent<any>}
   */
  async getChannelInfo(receiverAddress: string, from: string): Promise<ChannelInfo> {
    const key = await this.tcmc.methods
      .getKey(from, receiverAddress, this.defaultBlockNumber)
      .call({ from })
    const channel = await this.tcmc.methods.channels(key).call({ from })
    const channelInfo = {} as ChannelInfo
    channelInfo.key = key
    channelInfo.deposit = new BN(channel.deposit)
    channelInfo.blockNumber = channel.open_block_number
    return channelInfo
  }

  /**
   * @method Channel Method - getChannelDeposit
   * @desc   获取已经建立的Channel的存款 Deposit
   *
   * @param {string} receiverAddress
   * @param {string} from
   * @returns {Promise<BN>}
   */
  async getChannelDeposit(receiverAddress: string, from: string): Promise<string> {
    const info = await this.getChannelInfo(receiverAddress, from)
    return info.deposit.toString()
  }

  /**
   * @method Channel Method  -  getChannelKey
   * @descri 根据dbot地址、 获取合约中Channels 的 Mapping的key
   *
   * @param {string} senderAddress
   * @param {string} receiverAddress
   * @param {number} blockNumer
   * @param {string} from
   * @returns {Promise<any>}
   */
  async getChannelKey(senderAddress: string, receiverAddress: string, from: string) {
    return this.tcmc.methods
      .getKey(senderAddress, receiverAddress, this.defaultBlockNumber)
      .call({ from })
  }

  /**
   * @method Channel Method - createChannel
   * @desc   创建用户和Dbot交易通道
   *
   * @param {string} receiverAddress
   * @param {number} value
   * @param {string} from
   * @returns {Promise<any>}
   */
  async createChannel(
    receiverAddress: string,
    deposit: string,
    from: string,
    cb: Function
  ): Promise<any> {
    const startTime = new Date().getTime()
    const channelInfo = await this.getChannelInfo(receiverAddress, from)
    const value = Web3.utils.toBN(deposit)
    const blockNumberBN = new BN(channelInfo.blockNumber, 0)
    const endTime1 = new Date().getTime()
    console.log('-------------createChannel---------------------', endTime1 - startTime)
    if (!channelInfo.deposit.isZero() || !blockNumberBN.isZero()) {
      return CreateChannelException
    }
    return this.tcmc.methods.createChannel(receiverAddress).send({ from, value }, cb)
  }

  /**
   * @method Channel Method - getChannelDetail
   * @desc   从DbotServer获取channelInfo信息
   *
   *
   * @param {string} receiverAddress
   * @param {string} senderAddress
   * @param {number} blockNumber
   * @param {string} from
   * @returns {Promise<any>}
   */
  async getChannelDetail(receiverAddress: string, from: string) {
    let dbotContract
    try {
      dbotContract = new this.web3.eth.Contract(DbotJson.abi, receiverAddress)
    } catch (e) {
      return GetChannelDetailException1
    }
    let dbotContractDomain
    try {
      dbotContractDomain = await dbotContract.methods.domain().call({ from })
    } catch (e) {
      return GetChannelDetailException3
    }
    const dbotDomain = Web3.utils.hexToString(dbotContractDomain)
    const channelInfoURL = `${this.handlerDbotDomain(
      dbotDomain,
      this.hyperProtocolType
    )}/api/v1/dbots/${receiverAddress}/channels/${from}`
    console.log('---------getChannelDetail-----------', channelInfoURL)
    let channelInfos
    try {
      channelInfos = await axios.get(channelInfoURL)
    } catch (e) {
      return GetChannelDetailException2
    }
    if (channelInfos.data && channelInfos.data.length === 1) {
      const channelInfo = channelInfos.data[0]
      return channelInfo
    }
    return
  }

  /**
   * @method Channel Method - requestCloseSignature
   * @desc   发送DELETE请求给DbotServer，获取关闭Channel的签名
   *
   * @param {string} receiverAddress
   * @param {number} balance
   * @param {string} from
   * @returns {Promise<any>}
   */
  async requestCloseSignature(receiverAddress: string, balance: string, from: string) {
    let dbotWeb3
    try {
      dbotWeb3 = new this.web3.eth.Contract(DbotJson.abi, receiverAddress)
    } catch (e) {
      const errMsg: string = 'Init DbotContract Fail'
      const initDbotFailMsg = {} as MsgResponse
      initDbotFailMsg.status = 1
      initDbotFailMsg.msg = errMsg
      return initDbotFailMsg
    }
    const domain = Web3.utils.hexToString(await dbotWeb3.methods.domain().call({ from }))
    const channelDetail = await this.getChannelInfo(receiverAddress, from)
    const blockNumber = channelDetail.blockNumber

    const URL = `${this.handlerDbotDomain(
      domain,
      this.hyperProtocolType
    )}/api/v1/dbots/${receiverAddress}/channels/${from}/${blockNumber}`.toString()
    let closeSignChannelInfo
    try {
      closeSignChannelInfo = await axios.delete(URL, { params: { balance: balance } })
    } catch (e) {
      return RequestCloseSignatureException2
    }
    const closeSignature = closeSignChannelInfo.data.close_signature
    return closeSignature
  }

  /**
   * @method Channel Method - topUpChannel
   * @desc   给Channel增加 存款Deposit
   *
   * @param {string} receiverAddress
   * @param {number} blockNumber
   * @param {string} value
   * @param {string} from
   * @returns {any}
   */
  async topUpChannel(
    receiverAddress: string,
    value: string,
    from: string,
    cb: Function
  ): Promise<any> {
    return this.tcmc.methods
      .topUp(receiverAddress, this.defaultBlockNumber)
      .send({ from, value }, cb)
  }

  // NEW API END
  // NEW API START

  /**
   * 0x6c7986a0c46815495e592b1afca62b157027ee65
   * @method  CallAPI Method - callAPI
   * @desc    发送对API的请求
   *
   * @param {string} dbotAddress
   * @param {string} method
   * @param {string} uri
   * @param {AxiosRequestConfig} option
   * @param {string} from
   * @returns {Promise<any>}
   */
  async callAPI(
    dbotAddress: string,
    method: string,
    uri: string,
    option: AxiosRequestConfig,
    from: string
  ) {
    // 1. 判断 EndPoint是否存在于链上  如果在验证通过，不再提示用户链上在自己的dbot上注册Endpoint信息
    let dbotContract
    // 2. dbot init first
    try {
      dbotContract = new this.web3.eth.Contract(DbotJson.abi, dbotAddress)
    } catch (e) {
      return CallAPIException1
    }
    const dbotDomain = Web3.utils.hexToString(await dbotContract.methods.domain().call({ from }))
    const key = await dbotContract.methods
      .getKey(Web3.utils.stringToHex(method), Web3.utils.stringToHex(uri))
      .call({ from })

    let endPoint
    try {
      endPoint = await dbotContract.methods.keyToEndPoints(key).call({ from })
    } catch (e) {
      return CallAPIException2
    }
    const channelInfoURL = `${this.handlerDbotDomain(
      dbotDomain,
      this.hyperProtocolType
    )}/api/v1/dbots/${dbotAddress}/channels/${from}`
    let channelInfos
    try {
      channelInfos = await axios.get(channelInfoURL)
    } catch (e) {
      return CallAPIException3
    }
    if (channelInfos.length === 0) {
      return CallAPIEXception4
    }
    const channelInfo = channelInfos.data[0]
    // 4.获取Dbot地址之后要验证 签名是否正确
    const balanceBN = Web3.utils.toBN(channelInfo.balance)
    const priceBN = Web3.utils.toBN(endPoint.price)
    const newBalance = balanceBN.add(priceBN).toString()
    const balanceSignature = await this.getBanlanceSign(dbotAddress, newBalance, from)
    const dbotURL: string = `${this.handlerDbotDomain(
      dbotDomain,
      this.hyperProtocolType
    )}/call/${dbotAddress}${uri}`
    // 将balance和price注册到请求头中
    // option.headers.RDN_balance = '10000'
    option.headers.RDN_balance = newBalance
    option.headers.RDN_balance_signature = balanceSignature
    option.headers.RDN_sender_address = channelInfo.sender
    option.headers.RDN_receiver_address = channelInfo.receiver
    option.headers.RDN_open_block = channelInfo.open_block_number
    option.url = dbotURL
    return axios(option)
      .then(function(response: any) {
        const successMsg = {} as MsgResponse
        successMsg.data = response
        successMsg.status = 200
        successMsg.msg = 'success'
        return successMsg
      })
      .catch(function(error: any) {
        const status = error.response.status
        const exceptionMsg = {} as MsgResponse
        exceptionMsg.status = status
        exceptionMsg.msg = error.response.statusText
        exceptionMsg.data = error.response
        return exceptionMsg
      })
  }

  //  NEW API END
  /**
   * @Method Channel Method - closeChannel
   * @Desc   关闭交易的Channel
   *
   * @resource_link reference https://github.com/ATNIO/AI_market_plan/wiki/implement-proposal
   *
   * @param {string} receiverAddress
   * @param {string} senderAddress
   * @param {number} balance
   * @param {string} from
   * @returns {Promise<string>}
   */
  async closeChannel(
    receiverAddress: string,
    from: string,
    balance: string,
    callBack: Function
  ): Promise<any> {
    let dbotContract
    try {
      dbotContract = new this.web3.eth.Contract(DbotJson.abi, receiverAddress)
    } catch (e) {
      return CloseChannelException1
    }
    const dbot = {} as Dbot
    dbot.domain = Web3.utils.hexToString(await dbotContract.methods.domain().call({ from }))
    const channelDetail = await this.getChannelInfo(receiverAddress, from)
    const blockNumber = channelDetail.blockNumber
    const targetUrl = this.handlerDbotDomain(dbot.domain, this.hyperProtocolType)
    const URL: string = `${targetUrl}/api/v1/dbots/${receiverAddress}/channels/${from}/${blockNumber}`

    let closeSignChannelInfo
    try {
      closeSignChannelInfo = await axios.delete(URL, { params: { balance: balance } })
    } catch (e) {
      console.error(e.name, e.message)
      return CloseChannelException2
    }
    const closeSignature = closeSignChannelInfo.data.close_signature
    const balanceSignature = await this.getBanlanceSign(receiverAddress, balance, from)
    return this.tcmc.methods
      .cooperativeClose(
        receiverAddress,
        this.defaultBlockNumber,
        balance,
        balanceSignature,
        closeSignature
      )
      .send({ from }, callBack)
  }

  /**
   * @method Sign Method - getRegisterLoginParams
   * @desc   获取登陆的Params对应的Scheme
   *
   * @param {string} from
   * @returns {MsgParam[]}
   */
  public getRegisterLoginParams(from: string): MsgParam[] {
    return [
      {
        type: 'string',
        name: 'message_id',
        value: 'Send login request signature'
      },
      {
        type: 'uint32',
        name: 'timestamp',
        value: '' + Math.floor(Date.now() / 1000)
      },
      {
        type: 'address',
        name: 'login_account',
        value: from
      }
    ]
  }

  /**
   * @method Sign Method - getBalanceProofSignatureParams
   * @desc   获取对DBbotServer的签名的Scheme
   *
   * @param {string} receiverAddress
   * @param {number} balance
   * @returns {MsgParam[]}
   */
  private getBalanceProofSignatureParams(receiverAddress: string, balance: string): MsgParam[] {
    return [
      {
        type: 'string',
        name: 'message_id',
        value: 'Sender balance proof signature'
      },
      {
        type: 'address',
        name: 'receiver',
        value: receiverAddress
      },
      {
        type: 'uint256',
        name: 'balance',
        value: balance
      },
      {
        type: 'address',
        name: 'contract',
        value: this.tcmcDefaultAddress
      }
    ]
  }

  async getBanlanceSign(receiverAddress: string, balance: string, from: string): Promise<string> {
    const params = this.getBalanceProofSignatureParams(receiverAddress, balance)
    const result = await promisify<{ result: string; error: Error }>(
      this.web3.currentProvider,
      'sendAsync'
    )({
      method: 'eth_signTypedData',
      params: [params, from],
      from: from
    })
    return result.result
  }

  async getLoginSign(from: string): Promise<any> {
    const params = this.getRegisterLoginParams(from)
    const result = await promisify<{ result: string; error: Error }>(
      this.web3.currentProvider,
      'sendAsync'
    )({
      method: 'eth_signTypedData',
      params: [params, from],
      from: from
    })
    return result
  }

  /**
   * @method Get Tx Method , Get Tx Infomation
   * @desc   根据交易hash值，获取 当前交易的状态
   *
   * @param {string} txHash         Transaction hash to wait for
   * @param {number} timeout        sample: 4e3(ms) - 4000ms
   * @param {number} confirmations  Number of confirmations to wait after tx is mined
   * @returns {Promise<any>}        Promise to mined receipt of transaction
   */
  async waitTx(
    txHash: string,
    timeout: number = 5e3,
    confirmations: number = 6,
    obj: Flag
  ): Promise<any> {
    console.log('-----------------hash------------', txHash)
    const blockStart = await promisify<number>(this.web3.eth, 'getBlockNumber')()
    const startTime = new Date().getTime()
    const endTime = startTime + timeout * (confirmations + 1)
    obj.startTime = startTime
    do {
      await asyncSleep(1e3)
      if (typeof obj === 'object') {
        const flag = obj.flag
        if (!flag) break
      }
      const [receipt, block] = await Promise.call([
        await this.web3.eth.getTransactionReceipt(txHash),
        await this.web3.eth.getBlockNumber()
      ])
      if (!receipt || !receipt.blockNumber) {
        console.log('Waiting tx..', block - blockStart)
      } else if (block - receipt.blockNumber < confirmations) {
        console.log('Waiting confirmations...', block - receipt.blockNumber)
      } else {
        return receipt
      }
      obj.loopTime = new Date().getTime()
      if (endTime < new Date().getTime()) {
        break
      }
    } while (true)
    return WaitTxException
  }
}

export default Atn

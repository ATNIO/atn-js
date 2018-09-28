import { AxiosRequestConfig } from 'axios'

import Atn from '../src/atn'
import { Flag } from '../typings/atn'

const BN = require('bn.js')

const Web3 = require('web3')

const axios = require('axios')

const iconv = require('iconv-lite')

const DbotJson = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_domain',
        type: 'bytes32'
      }
    ],
    name: 'changeDomain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_open_block_number',
        type: 'uint32'
      },
      {
        name: '_balance',
        type: 'uint256'
      },
      {
        name: '_balance_msg_sig',
        type: 'bytes'
      }
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_method',
        type: 'bytes32'
      },
      {
        name: '_price',
        type: 'uint256'
      },
      {
        name: '_uri',
        type: 'bytes32'
      }
    ],
    name: 'updateEndPoint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'keyToEndPoints',
    outputs: [
      {
        name: 'method',
        type: 'bytes32'
      },
      {
        name: 'price',
        type: 'uint256'
      },
      {
        name: 'uri',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'bytes32'
      }
    ],
    name: 'changeName',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'bytes32'
      },
      {
        name: '_domain',
        type: 'bytes32'
      }
    ],
    name: 'changeNameAndDomain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_method',
        type: 'bytes32'
      },
      {
        name: '_price',
        type: 'uint256'
      },
      {
        name: '_uri',
        type: 'bytes32'
      }
    ],
    name: 'addEndPoint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'domain',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_method',
        type: 'bytes32'
      },
      {
        name: '_uri',
        type: 'bytes32'
      }
    ],
    name: 'getKey',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'sc',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_method',
        type: 'bytes32'
      },
      {
        name: '_uri',
        type: 'bytes32'
      }
    ],
    name: 'deleteEndPoint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_name',
        type: 'bytes32'
      },
      {
        name: '_domain',
        type: 'bytes32'
      },
      {
        name: '_method',
        type: 'bytes32'
      },
      {
        name: '_price',
        type: 'uint256'
      },
      {
        name: '_uri',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'name',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'domain',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'method',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'uri',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'key',
        type: 'bytes32'
      }
    ],
    name: 'CreateDbot',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'name',
        type: 'bytes32'
      }
    ],
    name: 'ChangeName',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'domain',
        type: 'bytes32'
      }
    ],
    name: 'ChangeDomain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'name',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'domain',
        type: 'bytes32'
      }
    ],
    name: 'ChangeNameAndDomain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'method',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'uri',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'key',
        type: 'bytes32'
      }
    ],
    name: 'AddEndPoint',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'method',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'uri',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'key',
        type: 'bytes32'
      }
    ],
    name: 'UpdateEndPoint',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'method',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'uri',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'key',
        type: 'bytes32'
      }
    ],
    name: 'DeleteEndPoint',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: false,
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  }
]

/**
 * ATN Jest Test
 */
describe('Atn Jest Test', () => {
  const timeout = 1000000

  const atn = new Atn('http://127.0.0.1:8545')

  it('works if true is truthy', () => {
    console.log('---------------------init atn ----------------------')
    expect(true).toBeTruthy()
  })

  /**
   * @description Dbot Contract Operate API Example
   * @attention this test should use the chain-core server api
   */
  // it('1. Create  Dbot ', async () => {
  //   const nameHex = Web3.utils.stringToHex('TestDbot')
  //   // your dbot domain
  //   const domain = Web3.utils.stringToHex('localhost:5000')
  //   const method = Web3.utils.stringToHex('post')
  //   const price = Web3.utils.stringToHex('1000000000000000')
  //   const uri = Web3.utils.stringToHex('/lexer')
  //
  //   const dbotParam = {
  //     'jsonrpc': '2.0',
  //     'method': 'atn_createDbot',
  //     'params': [
  //       {
  //         'from': '0x6c7986a0c46815495e592b1afca62b157027ee65',
  //         'gas': '0xfffff'
  //       },
  //       {
  //         'name': nameHex,
  //         'domain': domain,
  //         'action': method,
  //         'price': price,
  //         'uri': uri
  //       }
  //     ],
  //     'id': 1
  //   }
  //
  //   const axiosRequestConfig = {
  //     method: 'post',
  //     url: 'http:127.0.0.1:8545',
  //     data: dbotParam
  //   }
  //   const result = await axios(axiosRequestConfig)
  //
  //
  // })
  //
  // it('1. Test getEndPointPrice', async () => {
  //   console.log('-------getEndPointPrice Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const method = 'post'
  //   const uri = '/lexer'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const endPoint = await atn.getEndPointPrice(dbotAddress, method, uri, from)
  //   console.log('getEndPointPrice Test End-------', endPoint)
  // })
  //
  //
  // it('2. Test getDbotName', async () => {
  //   console.log('-------getDbotName Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const endPoint = await atn.getDbotName(dbotAddress, from)
  //   console.log('getDbotName Test End-------', endPoint)
  // })
  //
  // it('3. Test getDbotDomain', async () => {
  //   console.log('-------getDbotDomain Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x8ad1c2e20ee00baeac2c8c496d0039a36932aea8'
  //   const from = '0x845c0aaba0dabd59115c0601b429e23ec713cc80'
  //   const domain = await atn.getDbotDomain(dbotAddress, from)
  //   console.log('getDbotDomain Test End-------', domain)
  // })
  //
  // it('4. Test getChannelPeriod', async () => {
  //   console.log('-------getChannelPeriod Test Start-------')
  //   jest.setTimeout(1000000)
  //   const from = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const channelPeriod = await atn.getChannelPeriod(from)
  //   console.log('getChannelPeriod Test End-------', channelPeriod)
  // })
  //
  // it('5. Test getChannelDeposit', async () => {
  //   console.log('-------getChannelDeposit Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const blockNumber = 464
  //   const channelPeriod = await atn.getChannelDeposit(dbotAddress, from, blockNumber, from)
  //   console.log('getChannelDeposit Test End-------', channelPeriod)
  // })
  //
  // it('6. Test getChannelDetail', async () => {
  //   console.log('-------getChannelDetail Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const blockNumber = 464
  //   const channelPeriod = await atn.getChannelDetail(dbotAddress, from, blockNumber, from,)
  //   console.log('getChannelDetail Test End-------', channelPeriod)
  // })
  // //
  // it('6. Test createChannel', async () => {
  //   console.log('-------createChannel Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const channelPeriod =  atn.createChannel(dbotAddress, "400000000000000", from,console.log)
  //   channelPeriod.then(res => {
  //     console.log
  //   })
  //   console.log('createChannel Test End-------', channelPeriod)
  // })
  //
  // it('7. Test topUpChannel', async () => {
  //   console.log('-------topUpChannel Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const channelPeriod = await atn.topUpChannel(dbotAddress, 4421, '1700000000000000', from)
  //   // console.log('topUpChannel Test End-------', channelPeriod)
  // })
  //
  // it('8. Test closeChannel', async () => {
  //   console.log('-------closeChannel Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const blockNumber = 1907
  //   const dbotWeb3 = new Web3.eth.Contract(DbotJson, dbotAddress)
  //   const balance = 5000000000000000
  //   const domain = Web3.utils.hexToString(await dbotWeb3.methods.domain().call({ from: from }))
  //   const URL = `http://${domain}/api/v1/dbots/${dbotAddress}/channels/${from}/${blockNumber}`.toString()
  //   let closeSignChannelInfo
  //   try {
  //     closeSignChannelInfo = await axios.delete(URL, { data: { balance: balance } })
  //     console.log('closeSignChannelInfo : ', closeSignChannelInfo.data.close_signature)
  //   } catch (e) {
  //     console.error(e.name, e.message)
  //     throw new Error('Get Delete Close_Signature Error')
  //   }
  //   const closeSignature = closeSignChannelInfo.data.close_signature
  //   // const closeChannel = await atn.closeChannel(dbotAddress, balance, blockNumber, closeSignature, from)
  //   // console.log('closeChannel Test End-------', closeChannel)
  // })
  //
  // it('9. Test RequestCloseSignature', async () => {
  //   console.log('-------RequestCloseSignature Test Start-------')
  //   jest.setTimeout(1000000)
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const balance = '1000000000000000'
  //   // const blockNumber = 4421
  //   const result = await atn.requestCloseSignature(dbotAddress, balance, from)
  //   console.log('-------RequestCloseSignature Test End-------', result)
  // })
  //
  // it('10. Test CallDbotAPI', async () => {
  //   console.log('-------CallDbotAPI Test Start-------')
  //   jest.setTimeout(1000000)
  //   console.log(
  //     '===================DbotFactory Method ,CallAI Test Start=========================='
  //   )
  //   const domain = 'localhost:5000'
  //   const method = 'post'
  //   const uri = '/rpc/2.0/nlp/v1/lexer'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const price = 10
  //   const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
  //   const response = await axios.get(
  //     `http://${domain}/api/v1/dbots/${dbotAddress}/channels/${from}`
  //   )
  //   // TODO should only one channel
  //   const channelInfo = response.data[0]
  //   console.log('Test ChannelInfo------------------------- ', channelInfo)
  //   const data = {
  //     text: '百度是一家高科技公司'
  //   }
  //   const gbkBytes = iconv.encode(JSON.stringify(data), 'gbk')
  //
  //   const option = {
  //     headers: { 'Content-Type': 'application/json' },
  //     responseEncoding: 'GBK',
  //     method: method,
  //     data: gbkBytes
  //   }
  //   console.log(
  //     'params++++++++++++++++++++++++++',
  //     channelInfo['receiver'],
  //     channelInfo['open_block_number'],
  //     channelInfo['balance'] + price
  //   )
  //   const result = await atn.callAPI(dbotAddress, method, uri, option, from)
  //   console.log('result ================', result)
  //
  //   console.log('-------CallDbotAPI Test End-------')
  // })
  // curl -X POST -H "Content-type: application/json" -c cookies 192.168.1.178:7001/api/v1/login  -d '{"params":[ { "type": "string", "name":"message_id", "value": "Send login request signature" }, { "type": "uint32", "name": "timestamp", "value": "1534731089" }, { "type": "address", "name": "login_account", "value":"0xece495f764c9230db9ff1eb320bbd2f6635294b3" } ], "sig":"0x575d40ecf4c9951aef4d43e6e351aa2a00e8af7bdcb265dd7052502b9f25a7ed75aaabecfe56ffe189a7cb17982bde8d5c862385dbab0c8e7ae48f3a53a943cd1b"}'
  //
  // it('11. Test GetLoginBanlanceSign', async () => {
  //   console.log('-------GetLoginBanlanceSign Test Start-------')
  //   jest.setTimeout(1000000)
  //
  //   const result = await atn.getRegisterLoginParams('0xece495f764c9230db9ff1eb320bbd2f6635294b3')
  //   console.log('GetLoginBanlanceSign GetLoginBanlanceSign', result)
  // })
  //
  // it('12. New CreateChannel', async () => {
  //   const startTime =new Date().getTime()
  //   console.log('--------------12 start ---------------',startTime)
  //   // const creatChannelDbotAddress = '0x23f65032318d29f7f8e7766421169dab43eb93c6'
  //   const creatChannelDbotAddress = '0xb58b487d1c54f0d2e0a2a947dc2deea2056b6892'
  //   const deposit = '444000000000000000'
  //   // const from = '0x845c0aaba0dabd59115c0601b429e23ec713cc80'
  //   const from = '0x6c7986a0c46815495e592b1afca62b157027ee65'
  //   let hash
  //   const result = await atn.createChannel(creatChannelDbotAddress, deposit, from,function(err:any,txHash:any) {
  //     if (err) return
  //     hash =  txHash
  //   })
  //   console.log('result', hash)
  //   const endTime = new Date().getTime()
  //   console.log('--------------12 end ---------------',endTime-startTime)
  // })
  //
  // it('13. New CloseChannel', async () => {
  //   const creatChannelDbotAddress = '0xfc842de2cceb59f7d307ada536ddc57aac8c9785'
  //   const balance = '1000000000000000'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const result =await atn.closeChannel(creatChannelDbotAddress,balance,from)
  //   console.log('close Channel close  Channel',result)
  // })
  //
  // it('14. New GetChannelDetail', async () => {
  //   const creatChannelDbotAddress = '0xfc842de2cceb59f7d307ada536ddc57aac8c9785'
  //   const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
  //   const result = await atn.getChannelDetail(creatChannelDbotAddress, from)
  //   // const num:number[]=[123,3231,32]
  //   console.log(`close Channel close Channel`, Math.min(2313, 123, 32))
  // })
  //
  it('15. Add New WaitTx', async () => {
    const hash = '0x3d84ed606a5eb02bb59bc855535d75edf33761c96e8ae675595b4aa16953e4ea'
    const timeout = 4e3
    const flag = {} as Flag
    flag.flag = false
    const result = await atn.waitTx(hash, timeout, 6, flag)
    console.log('Add New WaitTx', result)
  })
})

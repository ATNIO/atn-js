atn-js is for building browser AIapps & NodeJS services that interact with ATN Network.

![atn-js architecture](https://github.com/ATNIO/AI_market_plan/blob/master/images/ATN-JS.svg)

## TODO LIST



## Prototype

```js
class Atn {
  /**
   * Web3 instance
   */
  web3: Web3;
  /**
   * Channel manager contract instance
   */
  contract: Web3.ContractInstance;
  /**
   * ATN decimal
   */
  decimals: number = 18;
  /**
   * Atn constructor
   *
   * @param web3  Web3 http url, or object with currentProvider property
   * @param contractAddr  Channel manager contract address
   * @param contractABI  Channel manager ABI
   */
   constructor(
    web3: string | { currentProvider: any },
    contractAddr: string,
    contractABI: any[]
  ) 

  /**
   * request all dbot list.
   *
   * @param dbot_id The index id of the dbot
   * @returns  Promise to dbot array 
   */
   async getDbotList(dbot_id?: number): Promise<Dbot[]>

  /**
   * request the dbot detail info.
   *
   * @param adddress The address of the dbot
   * @returns  Promise to dbot info
   */
   async getDbotInfo(address?: number): Promise<DbotInfo>
 
  /**
   * Open a channel for sender to receiver, depositing some tokens on it
   *
   * Should work with ATN.
   * @param sender  Sender/client's account address
   * @param receiver  Receiver/server's account address
   * @param deposit  Tokens to be initially deposited in the channel
   * @returns  Promise to [[ChannelInfo]] info object
   */
   async openChannel(sender: string, receiver:string, deposit:number): Promise<ChannelInfo> 

  /**
   * Top up a channel, by depositing some [more] tokens to it
   *
   * Should work with ATN
   *
   * @param sender  Sender/client's account address
   * @param receiver  Receiver/server's account address
   * @param deposit  Tokens to be initially deposited in the channel
   * @param block BlockNumber when the channel create
   * @returns  Promise to [[ChannelInfo]] info object
   */
   async topupChannel(sender: string, receiver:string, block:number, deposit:number): Promise<ChannelInfo>

  /**
   * Request a cooperative closeSign from receiver    
   * 
   * @param dbot_domain The domain of receiver's dbot
   * @param sender  Sender/client's account address
   * @param block BlockNumber when the channel creat
   * @param balance The number of ATN which the channel used
   * @returns  closingSig  Cooperative-close signature from receiver
   */

   private async closeRequest(dbot_domain:string, sender:string, block:number, balance:number):Promise<string>

  /**
   * Close channel with Cooperative-close  
   *
   * @param dbot_domain the domain of the dbot 
   * @param sender  Sender/client's account address
   * @param receiver  Receiver/server's account address
   * @param block BlockNumber when the channel creat
   * @param balance The number of ATN which the channel used 
   * @returns  Promise to transactionReceipt
   * */
   async closeChannel(dbot_domain:string, sender:string, receiver:string, block:number, balance:number): Promise<Web3.TransactionReceipt>

  /**
   * If channel was not cooperatively closed, and after settlement period,
   * this function settles the channel, distributing the tokens to sender and
   * receiver.
   *
   * @param sender  Sender/client's account address
   * @param receiver  Receiver/server's account address
   * @param block BlockNumber when the channel create
   *
   * @returns  Promise to settlement transactionReceipt
   */
   async settleChannel(sender: string, receiver:string, block:number): Promise<web3.TransactionReceipt>

  /**
   * request all the channels info.
   * @param dbot_domain the domain of the dbot 
   * @param block BlockNumber when the channel creat
   * @param status status of the channel 
   *
   * @returns Promise to [[ChannelInfo]] info Array  
   */
   async getChannels(dbot_domain:string, block?:number, status?:number): Promise <ChannelInfo[]>

  /**
   * Call AI use the state channel for payment.
   * @param dbot_domain The domain of the dbot 
   * @param dbot_address The address of the dbot
   * @param input The input of the request
   * @param sender  Sender/client's account address
   * @param receiver  Receiver/server's account address
   * @param block BlockNumber when the channel creat
   * @param balance The number of ATN which the channel used
   * @returns Promise to the result of the request 
   */
   async callAI(dbot_domain:string, dbot_address:string, input:string, sender:string, receiver:string,  block?:number, balance:number): Promise <Respone>

}
    
```

## Usage

### call AI
**Step 1:**
Getting all AI info 
`atn.getDbotList()`

**Step 2:**
Choosing an AI to use 
`atn.getDbotInfo()`

**Step 3:**
Opening a transfer channel
`atn.openChannel()`

**Step 4:**
Calling the AI`lib.callAI()`




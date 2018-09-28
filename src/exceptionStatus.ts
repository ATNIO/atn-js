interface ExceptionStatus {
  readonly status: number
  readonly msg: string
}

/**
 *  异常 常量定义
 */
export const CreateChannelException: ExceptionStatus = {
  // create Channel Exception
  status: 21,
  msg: 'Channel has exist'
}

export const GetChannelDetailException1: ExceptionStatus = {
  status: 11,
  msg: 'Init dbotContract error'
}

export const GetChannelDetailException2: ExceptionStatus = {
  status: 12,
  msg: 'Get channels from server error'
}

export const GetChannelDetailException3: ExceptionStatus = {
  status: 13,
  msg: 'Get Dbot Domain error'
}

export const RequestCloseSignatureException1: ExceptionStatus = {
  status: 1,
  msg: 'Init DbotContract Fail'
}

export const RequestCloseSignatureException2: ExceptionStatus = {
  status: 3,
  msg: 'Get Delete Close_Signature Error'
}

export const CallAPIException1: ExceptionStatus = {
  status: 41,
  msg: 'Init DbotContract Fail'
}

export const CallAPIException2: ExceptionStatus = {
  status: 42,
  msg: 'CallAPI Get EndPoint Fail'
}

export const CallAPIException3: ExceptionStatus = {
  status: 43,
  msg: 'CallAPI Get Channel From Server Error'
}

export const CallAPIEXception4: ExceptionStatus = {
  status: 44,
  msg: 'No Channel For Call AI, ChannelInfoURL'
}

export const CloseChannelException1: ExceptionStatus = {
  status: 31,
  msg: 'Init DbotContract Fail'
}

export const CloseChannelException2: ExceptionStatus = {
  status: 32,
  msg: 'Get Delete Close_Signature From DbotServer Error'
}

export const WaitTxException: ExceptionStatus = {
  status: 51,
  msg: 'WaitTx Timeout'
}

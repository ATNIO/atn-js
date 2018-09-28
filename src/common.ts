interface EnvConfig {
  readonly env: string
}

export const ProductENV: EnvConfig = {
  env: 'prod'
}

export const DevelopENV: EnvConfig = {
  env: 'dev'
}

export const PreleaseEnv: EnvConfig = {
  env: 'pre'
}

export function handlerDbotDomain(domain: string, hyperProtocolType: string) {
  const result = domain.toLowerCase().startsWith('http')
    ? domain
    : hyperProtocolType.concat('://').concat(domain)
  return result
}

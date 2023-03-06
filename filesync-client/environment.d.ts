declare namespace NodeJS {
    export interface ProcessEnv {
      readonly SERVER_PROTOCAL: string
      readonly SERVER_HOST: string
      readonly SERVER_PORT: string
    }
  }
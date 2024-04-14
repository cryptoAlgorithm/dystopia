export interface IBaseUser {
  username: string
  /**
   * Average embedding vector of user interests
   */
  interests?: number[]
}

interface IHumanUser extends IBaseUser {
  password: string
}

interface IBotUser extends IBaseUser {
  persona?: string
}

export type IUser = ({ type: 'bot' } & IBotUser) | ({ type: 'user' } & IHumanUser)

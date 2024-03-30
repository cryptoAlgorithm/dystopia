interface IBaseUser {
  username: string
}

interface IHumanUser extends IBaseUser {
  password: string
}

export type IUser = ({ type: 'bot' } & IBaseUser) | ({ type: 'user' } & IHumanUser)

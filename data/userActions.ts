import mongodb from "@/lib/mongodb";
import {IBaseUser, IUser} from "@/data/IUser";
import {WithId} from 'mongodb'
import {cache} from 'react'

export const getBotUsers = cache(async (): Promise<WithId<IBaseUser>[]> => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col
    .find({ type: 'bot' })
    .project<WithId<IBaseUser>>({ _id: 1, username: 1 })
    .toArray()
})

export const getUser = async (username: string, includeHash: boolean = false) => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col.findOne({ username }, { projection: includeHash ? undefined : { password: 0 } })
}

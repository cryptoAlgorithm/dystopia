import mongodb from "@/lib/mongodb";
import {IUser} from "@/data/IUser";

export const getUser = async (username: string) => {
  const col = (await mongodb).db().collection<IUser>('users')
  return col.findOne({ username })
}

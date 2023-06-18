import { User } from './users.model'

const getLastUserId = async () => {
  // Query to find the last user
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastUser?.id
}

export const genarateUserId = async (): Promise<string> => {
  // GETTING CURRENT USER ID
  const currentId =
    (await getLastUserId()) || ((0).toString().padStart(5, '0') as string)

  // INCRESE ID BY 1
  const newId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  // RETURN NEW USER ID
  return newId
}

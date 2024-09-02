import { User } from "../types/User"
import { getData } from "../utils/httpClient"

// function to fetch users
export const getUsers = () => {
  return getData<User[]>('/users').then(users => users);
}

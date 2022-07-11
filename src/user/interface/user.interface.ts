export default interface IUser {
  id: string
  avatar?: string
  email: string
  username: string
  profile?: string
  is_active: boolean
  is_trial: boolean
  expired_at?: Date
  created_at: Date
}

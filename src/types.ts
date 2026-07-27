export type User = {
  id: string
  email?: string | null
}

export type Attendance = {
  id: string
  user_id: string
  email: string
  check_in: string | null
  check_out: string | null
  created_at: string
}

import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User, Attendance } from '../types'
import CheckButtons from '../components/CheckButtons'
import AttendanceList from '../components/AttendanceList'

export default function Dashboard({ user }: { user: User }){
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    const { data, error } = await supabase.from('attendance').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100)
    if (error) console.error(error)
    setAttendance(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Welcome, {user.email}</h2>
        <p className="text-sm text-gray-500">Employee Dashboard</p>
        <div className="mt-4">
          <CheckButtons user={user} onDone={load} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Attendance History</h3>
        {loading ? <p>Loading...</p> : <AttendanceList rows={attendance} />}
      </div>
    </div>
  )
}

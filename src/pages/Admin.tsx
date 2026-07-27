import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User, Attendance } from '../types'

export default function Admin({ user }: { user: User }){
  const [rows, setRows] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    const { data, error } = await supabase.from('attendance').select('*').order('created_at', { ascending: false }).limit(500)
    if (error) console.error(error)
    setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">All attendance records</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? <p>Loading...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="text-left text-gray-600">
                <tr><th className="p-2">Email</th><th className="p-2">Check In</th><th className="p-2">Check Out</th></tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-t"><td className="p-2">{r.email}</td><td className="p-2">{r.check_in ? new Date(r.check_in).toLocaleString() : '-'}</td><td className="p-2">{r.check_out ? new Date(r.check_out).toLocaleString() : '-'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

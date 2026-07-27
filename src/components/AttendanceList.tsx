import React from 'react'
import { Attendance } from '../types'

export default function AttendanceList({ rows }: { rows: Attendance[] }){
  if (!rows.length) return <p className="text-sm text-gray-500">No records yet</p>
  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div key={r.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="font-medium">{r.email}</div>
            <div className="text-sm text-gray-600">{r.check_in ? new Date(r.check_in).toLocaleString() : '-'}</div>
          </div>
          <div className="text-sm text-gray-600">{r.check_out ? new Date(r.check_out).toLocaleString() : '-'}</div>
        </div>
      ))}
    </div>
  )
}

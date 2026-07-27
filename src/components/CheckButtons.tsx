import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'

export default function CheckButtons({ user, onDone }: { user: User, onDone?: () => void }){
  const [loading, setLoading] = useState(false)

  async function checkIn(){
    setLoading(true)
    const { error } = await supabase.from('attendance').insert([{ user_id: user.id, email: user.email, check_in: new Date().toISOString() }])
    if (error) console.error(error)
    setLoading(false)
    onDone?.()
  }

  async function checkOut(){
    setLoading(true)
    // find latest open record
    const { data } = await supabase.from('attendance').select('id').eq('user_id', user.id).is('check_out', null).order('created_at', { ascending: false }).limit(1)
    const id = data?.[0]?.id
    if (id){
      const { error } = await supabase.from('attendance').update({ check_out: new Date().toISOString() }).eq('id', id)
      if (error) console.error(error)
    } else {
      // no open record - optionally create one with both times
      const { error } = await supabase.from('attendance').insert([{ user_id: user.id, email: user.email, check_in: new Date().toISOString(), check_out: new Date().toISOString() }])
      if (error) console.error(error)
    }
    setLoading(false)
    onDone?.()
  }

  return (
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={checkIn} disabled={loading}>Check In</button>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={checkOut} disabled={loading}>Check Out</button>
    </div>
  )
}

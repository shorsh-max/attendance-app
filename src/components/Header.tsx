import React from 'react'
import { User } from '../types'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function Header({ user }: { user: User | null }){
  async function signOut(){
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-bold">Attendance App</Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-700">Dashboard</Link>
              <Link to="/admin" className="text-sm text-gray-700">Admin</Link>
              <button onClick={signOut} className="text-sm text-red-600">Sign out</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

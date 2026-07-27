import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function signIn(e: React.FormEvent){
    e.preventDefault(); setLoading(true); setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setMessage(error.message)
    else setMessage('Signed in')
  }

  async function signUp(e: React.MouseEvent){
    e.preventDefault(); setLoading(true); setMessage('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setMessage(error.message)
    else setMessage('Check your email for confirmation or you can sign in directly in development')
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={signIn} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? '...' : 'Sign in'}</button>
          <button className="px-3 py-2 bg-gray-200 rounded" onClick={signUp} disabled={loading}>Sign up</button>
        </div>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      <p className="mt-4 text-xs text-gray-500">Use Sign up to create an account (email confirmation may be required).</p>
    </div>
  )
}

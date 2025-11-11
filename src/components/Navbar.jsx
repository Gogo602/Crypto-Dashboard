
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-15 py-5 border-b'>
        <h1 className='font-bold text-2xl'>Crypto</h1>
        <ul>
            <Link to='/' className='border px-5 py-1 rounded-lg'>Home</Link>
        </ul>
    </nav>
  )
}

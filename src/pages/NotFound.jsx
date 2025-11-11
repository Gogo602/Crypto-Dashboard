import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='flex items-center justify-center min-h-[98vh]'>
      <div className='spce-y-7 text-center'>
          <h4 className='font-bold text-5xl'>404</h4>
          <h5>Ooops Page Not Found</h5>
          <Link to="/">Back Home</Link>
        </div>
    </section>
  )
}

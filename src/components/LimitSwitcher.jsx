
import React from 'react'

export default function LimitSwitcher({limit, onlimitChange}) {
  return (
    <div className="my-5 flex items-center gap-1">
        <label htmlFor="limit" className='text-lg'>View: </label>
        <select name="limit" value={Number(limit)} onChange={(e) => onlimitChange(e.target.value)} className="w-12">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
    </div>
  )
}

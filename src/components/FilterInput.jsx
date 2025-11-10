import React from 'react'

export default function FilterInput({filter, onFilterChange}) {
  return (
    <div className="w-full">
        <input 
        type="text" 
        name="search" 
        id="search"  
        value={filter} 
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by name or symbol"
        className="border border-gray-50 px-3 py-1 rounded-lg outline-none w-full md:w-1/2"
        />
    </div>
  )
}

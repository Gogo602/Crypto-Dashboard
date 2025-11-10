import React from 'react'
import FilterInput from '../components/FilterInput'
import LimitSwitcher from '../components/LimitSwitcher'

export default function Home({filter, setFilter, limit, setLimit, loading,  error, filteredCoins }) {
  return (
    <div className='p-5 w-full'>
          <h1 className="font-bold text-3xl">Crypto Dashboard</h1>
          
          <div className="flex items-center justify-between w-full gap-10">
            <FilterInput filter={filter} onFilterChange={setFilter}/>
            <LimitSwitcher limit={limit} onlimitChange={setLimit}/>
          </div>
          
          {loading && (
            <p className="flex items-center justify-center h-[70vh]">Loading</p>
          )}
          {error && (
            <p className="flex items-center justify-center h-[70vh]">{error.message}</p>
          )}
          
          <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-4">
            {!loading && !error && filteredCoins.length > 0 ? filteredCoins.map((coin) => (
                <div key={coin.id} className="bg-gray-700 rounded-md p-5">
                   <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-8"/>
                      <div>
                        <h2 className="font-bold">{coin.name}</h2>
                        <p className="text-[10px]">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div>
                      <h3>Price: {coin.current_price}</h3>
                      <div>
                        24h Change: {" "}
                        <span style={{ color: coin.price_change_24h >= 0 ? "green" : "red" }}>
                          {coin.price_change_24h.toFixed(2)}
                        </span>
                      </div>
                    </div>
                </div>
            )) : (
                <div className="flex items-center justify-center h-[60vh] w-full">
                  <p>No Coins matches your search</p>
                </div>
            )}
          </div>
      </div>
  )
}

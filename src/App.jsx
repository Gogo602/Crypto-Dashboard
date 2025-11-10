import { useEffect, useState } from "react"


const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const getCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`);
        const data = await res.json()
        setCoins(data)
        
      }
      catch (error) {
        setError(error.message || "Error Fetching Coins")
      } finally {
        setLoading(false)
      }
    }
    getCoins()
  }, [limit])

  return ( 
      <div className='p-5 w-full'>
          <h1 className="font-bold text-3xl">Crypto Dashboard</h1>
          
          {loading && (
            <p className="flex items-center justify-center h-[70vh]">Loading</p>
          )}
          {error && (
            <p className="flex items-center justify-center h-[70vh]">{error.message}</p>
          )}
          
          <div className="my-5">
            <label htmlFor="limit">View: </label>
            <select name="limit" value={Number(limit)} onChange={(e) => setLimit(e.target.value)} className="w-15">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-4">
            {!loading && !error && coins.map((coin) => (
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
            ))}
          </div>
      </div>
  )
};

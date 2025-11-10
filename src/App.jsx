import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState("")

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


  const filteredCoins = coins.filter((coin) => {
    return coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase()) || coin.name.toLowerCase().includes(filter.toLocaleLowerCase())
  })

  return ( 
    <Routes>
      <Route path="/" element={
        <Home
          filter={filter} 
          setFilter={setFilter}
          limit={limit} 
          setLimit={setLimit} 
          loading={loading} 
          error={error} 
          filteredCoins={filteredCoins}
        />
      } />
    </Routes>
  )
};

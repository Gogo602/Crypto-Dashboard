import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const API_URL = 'https://api.coingecko.com/api/v3/coins' 

export default function CoinDetails() {
    const [coin, setCoin] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError ] = useState(null)
    const { id } = useParams()
   

    useEffect(() => {
        const getCoin = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)
                const data = await res.json()
                setCoin(data)

            } catch (error) {
                setError(error.message || "Error Fetching Coin")
            } finally {
                setLoading(false)
            }
        }
        
        getCoin()
    }, [id])


  return (
    <section className='flex items-center justify-center min-h-screen py-5 px-2'>
        
        {loading && (
            <p>Loading...</p>
        )}
        {error && (
            <p className='text-red'>{error.message}</p>
        )}
        {!loading && !error && (
            <div className='border bg-gray-700 md:min-w-lg max-w-lg p-5 shadow-2xl space-y-5 rounded-lg'>
                <div className='spacce-y-7 text-center'>
                    <img src={coin.image?.large} alt={coin.id} className='mx-auto w-30'/>
                    <h2 className='font-bold text-3xl'>{coin.name}({coin.symbol.toUpperCase()})</h2>
                </div>
                <p>{coin.description?.en.split(". ")[0] + '.'}</p>
                <div className='space-y-5 font-semibold'>
                    <p>Rank: {" "}{coin.market_cap_rank}</p>
                    <p>Current Price: {" "} ${coin.market_data.current_price.usd.toLocaleString()}</p>
                    <p>Market Cap: {" "} ${coin.market_data.market_cap.usd.toLocaleString()}</p>
                    <p>24h High: {" "} ${coin.market_data.high_24h.usd.toLocaleString()}</p>
                    <p>24h Low: {" "} ${coin.market_data.low_24h.usd.toLocaleString()}</p>
                    <p>24h Price Change:  {" "}
                        <span style={{color: coin.market_data.price_change_24h > 0 ? "green" : "red"}}>
                            {coin.market_data.price_change_24h.toFixed(2)}
                        </span>
                      </p>
                      <p>Circulating Supply {" "} ${coin.market_data.circulating_supply.toLocaleString()}</p>
                      <p>Total Supply {" "} ${coin.market_data.total_supply.toLocaleString()}</p>
                      <p>All Time High {" "} ${coin.market_data.ath.usd.toLocaleString()}</p>
                      <p>All Time Low {" "} ${coin.market_data.atl.usd.toLocaleString()}</p>
                      <p>Last Updated {" "} {coin.last_updated}</p>
                      <div className='flex flex-col space-y-5'>
                          {coin.links.homepage[0] && (
                              <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">Website</a>
                          )}

                          {coin.links.blockchain_site[0] && (
                              <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">Blockchain Explorer</a>
                          )}
                      </div>
                       <p>Categories: <br /> {" "} {coin.categories.join(", ")}</p>
                </div>
            </div>
        )}
    </section>
  )
}

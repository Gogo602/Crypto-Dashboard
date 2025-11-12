import React, { useEffect, useState } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js'
import "chartjs-adapter-date-fns"
import Spinner from './Spinner'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
)

const API_URL = 'https://api.coingecko.com/api/v3/coins' 

export default function CoinChart({ coinId }) {
    const [chartData, setChartData] = useState(null);
    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        const getChart = async () => {
            try {
                const res = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`)
                if (!res) throw new Error("No Data")
                const data = await res.json()
                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1]
                }))

                setChartData({
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            fill: true,
                            borderColor: "#007bff",
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            pointRadius: 0,
                            tension : 0.3,
                        }
                    ]
                })
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getChart()
    }, [coinId])
    console.log(chartData)
    
    
  return (
      <>
          {loading && (
              <Spinner />
          )}
          {!loading && (
             <div style={{marginTop: '30px'}}>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            tooltip: { mode: 'index', intersect: 'false'}
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                },
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 7
                                }
                            },
                            y: {
                                ticks: {
                                    callback: (value) => `$${value.toLocaleString()}`
                                }
                            }
                        }
                    }}
                />
            </div>  
            )}     
      </>
  )
}

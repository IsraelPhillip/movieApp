import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'your_api_key_here' // 🔐 Replace this with your real API key

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`)
      const responseData = response.data?.results ?? response.data
      setData(responseData)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (endpoint) {
      fetchData()
    }
  }, [endpoint])

  return { data, loading }
}

export default useFetchDetails

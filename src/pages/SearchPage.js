import React, { useEffect, useState, useCallback } from 'react'
import { Await, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const query = new URLSearchParams(location.search).get('q')
  console.log('Search query:', query)

  
  

  const fetchData = async () => {
    if (!query) return
  
    setLoading(true)
    console.log(`Fetching page ${page} for query: ${query}`)
  
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
        params: {
          api_key: 'YOUR_TMDB_API_KEY',
          query,
          page
        }
      })
  
      console.log('TMDB response:', response.data)
  
      setData(prev => [...prev, ...response.data.results])
    } catch (error) {
      console.log('API error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  
  

  // 🔁 Reset on new search query and fetch
  useEffect(() => {
    setPage(1)
    setData([])
    if (query) fetchData()
  }, [query])

  // 📦 Pagination (after scroll or button click)
  useEffect(() => {
    if (page > 1 && query) fetchData()
  }, [page])

  // 📜 Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200 && !loading) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  // 🔍 Debounced input handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      navigate(`/search?q=${value}`)
    }, 500),
    []
  )

  return (
    <div className='py-16'>

      {/* 🔍 Search Bar */}
      <div className='lg:hidden sticky top-[70px] z-30 px-4 pb-2'>
        <input
          type='text'
          placeholder='Search here...'
          className='w-full border px-4 py-1 rounded-full text-lg bg-white text-neutral-900'
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {/* 🔎 Search Results */}
      <div className='container mx-auto mt-6'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Search Results
        </h3>

        {/* No Results */}
        {data.length === 0 && !loading && (
          <p className='text-center text-gray-500 mt-10'>No results found.</p>
        )}

        {/* Results Grid */}
        <div className="flex justify-center lg:block">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-6">
            {data.map((searchData) => (
              <Card
                key={searchData.id + 'search'}
                data={searchData}
                media_type={searchData.media_type}
              />
            ))}
          </div>
        </div>

        {/* 🔄 Loading Indicator */}
        {loading && (
          <div className="text-center mt-6 text-gray-500">Loading...</div>
        )}

        {/* 📱 Fallback Load More for mobile */}
        {!loading && data.length > 0 && (
          <div className='lg:hidden flex justify-center mt-6'>
            <button
              className='bg-neutral-900 text-white px-4 py-2 rounded-full'
              onClick={() => setPage(prev => prev + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePages = () => {
  const { explore } = useParams()
  const [pageNo, setPageNO] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: { page: pageNo }
      })

      setData(prev => [...prev, ...response.data.results])
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNO(1)
    setData([])
    fetchData()
  }, [explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNO(prev => prev + 1)
    }
  }

  return (
    <div className='py-16'>
      <div className='container mx-auto px-4'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Popular {explore} Show
        </h3>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {data.map((exploreData) => (
            <Card
              key={exploreData.id + 'exploreSection'}
              data={exploreData}
              media_type={explore}
            />
          ))}
        </div>
      </div>
    </div>
  )
  
  
}

export default ExplorePages

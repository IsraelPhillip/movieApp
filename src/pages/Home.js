import React, { useEffect } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import axios from 'axios'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData)
  const {data: nowPlayingData} =useFetch('/movie/now_playing')
  const {data: topRated} =useFetch('/movie/top_rated')
  const {data: popularTvShow} =useFetch('/tv/popular')
  const {data: onTheAirShowData} =useFetch('/tv/on_the_air')


  




  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCard data={trendingData} heading={'Trending'} trending={true} media_type={'movie'} />
      <HorizontalScrollCard data={nowPlayingData} heading={'Now Playing'} media_type={'movie'} />
      <HorizontalScrollCard data={topRated} heading={'Top Rated Movies'} media_type={'movie'} />
      <HorizontalScrollCard data={popularTvShow} heading={'Popular TV Show'} media_type={'tv'} />
      <HorizontalScrollCard data={onTheAirShowData} heading={'On The Air'} media_type={'tv'} />

      


       
      
    </div>
  )
}

export default Home

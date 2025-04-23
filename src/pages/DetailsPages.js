import moment from 'moment/moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import Divider from '../components/Divider'
import useFetchDetails from '../hooks/useFetchDetails'
import useFetch from '../hooks/useFetch'

import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'


const DetailsPages = () => {
  const params = useParams()
  const imageURL = useSelector(state => state.movieoData.imageURL)

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendations } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')

const handlePlayVideo = (data)=>{
  setPlayVideoId(data)
  setPlayVideo(true)
}

  const writingRoles = ['Writer', 'Screenplay', 'Story', 'Short Story', 'Screenstory'];

const writerObj = writingRoles
  .map(role => castData?.crew?.find(el => el?.job === role))
  .find(Boolean); // first match that exists

const writerName = writerObj?.name || 'Unknown';

const directorRoles = ['Director', 'Assistant Director', 'Second Unit Director'];
const directorObj = directorRoles
  .map(role => castData?.crew?.find(el => el?.job === role))
  .find(Boolean);

const directorName = directorObj?.name || 'Unknown';


  console.log('data', data)
  console.log('star cast', castData)
  // console.log('Backdrop path:', data?.backdrop_path)
  // console.log('Full image src:', imageURL + data?.backdrop_path)
  console.log('params', params)

  const formatCurrency = (num) =>
  num ? `$${num.toLocaleString()}` : 'N/A';


  const Duration = data?.runtime
    ? (Number(data.runtime) / 60).toFixed(1).split('.')
    : null

  if (!data) return <div className='text-center py-10 text-white'>Loading...</div>

  return (
    <div>
      {/* Backdrop */}
      <div className='w-full h-[300px] relative hidden lg:block'>
        <div className='w-full h-full'>
          {data.backdrop_path && (
            <img
              src={imageURL + data.backdrop_path}
              className='h-full w-full object-cover'
              alt='Backdrop'
            />
          )}
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      {/* Main content */}
      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        {/* Poster */}
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          {data.poster_path && (
            <img
              src={imageURL + data.poster_path}
              className='h-80 w-60 object-cover rounded'
              alt='Poster'
            />
            
          )}
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black font-bold rounded text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
        </div>

        {/* Info */}
        <div>
          <h2 className='text-2xl lg:text-4xl text-white font-bold mb-1'>
            {data.title || data.name}
          </h2>
          {data.tagline && (
            <p className='text-neutral-400 italic mb-3'>{data.tagline}</p>
          )}

            <Divider/>

          <div className='flex flex-wrap items-center gap-4 text-sm text-neutral-300'>
            <p>
              <span className='font-semibold text-white'>Rating:</span>{' '}
              {data.vote_average ? Number(data.vote_average).toFixed(1) : 'N/A'}+
            </p>
            <span>|</span>

            <p>
              <span className='font-semibold text-white'>Votes:</span>{' '}
              {data.vote_count ?? 'N/A'}
            </p>
            <span>|</span>
            {Duration && (
              <p>
                <span className='font-semibold text-white'>Duration:</span>{' '}
                {Duration[0]}h {Duration[1]}m
              </p>
            )}
          </div>
          <Divider/>
          <div>
            <h3 className='text-xl text-white font-bold mb-1 mt-2'>Overview</h3>
            <p> {data.overview} </p>
            <Divider/>
            <div className='flex items-center gap-3 text-center my-3'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
               Release Date: {moment(data?.release_date || data?.first_air_date).format('MMMM Do YYYY')}
              </p>

              <span>|</span>
              <p>Revenue: {formatCurrency(data?.revenue)}</p>
             
            </div>
            <Divider/>

          </div>
          <div className='text-white'>

          <p><span className='text-white'>Director</span>: {directorName}</p>

          <Divider/>

          <p><span className='text-white'>Writer</span>: {writerName}</p>

          </div>

          
          <Divider/>
              <h2 className='font-bold text-lg'>Cast</h2>
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
          {
            castData?.cast?.filter(el => el?.profile_path).map((cast,index)=>{
              return (
                <div>
                  <div>
                    <img
                    src={imageURL+cast?.profile_path}
                    alt='Cast Image'
                    className='w-24 h-24 obj-cover rounded-full'
                    />
                  </div>
                  <p className='font-bold text-center text-sm text-neutral-400'>{cast?.name}</p>
                </div>
              )
            })
          }
        </div>
        </div>


      </div>

          <div>
            <HorizontalScrollCard data={similarData} heading={'Similar'+params?.explore} media_type={params?.explore} />
            <HorizontalScrollCard data={recommendations} heading={'Recommended'+params?.explore} media_type={params?.explore} />

          </div>
          {
            playVideo && (
              <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore} />

            )
          }


    </div>
  )
}

export default DetailsPages

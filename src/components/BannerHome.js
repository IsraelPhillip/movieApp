import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { data } from 'react-router-dom';

const BannerHome = () => {

    const bannerData = useSelector(state => state.movieoData.bannerData)
    const imageURL = useSelector(state => state.movieoData.imageURL)
    const [currentImage, setCurrentImage] = useState(0)
    // console.log(bannerData)

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }
    useEffect(()=>{
        const interval = setInterval (()=>{
            if (currentImage < bannerData.length - 1) {
                handleNext()
            }else{
                setCurrentImage(0)
            }
        },5000)
        return ()=> clearInterval(interval)
    },[bannerData,imageURL,currentImage])
    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {
                        return (
                            <div key={data.id + 'bannerHome' + index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' 
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <div className='w-full h-full'>
                                    <img
                                        src={data.backdrop_path ? `${imageURL}${data.backdrop_path}` : '/fallback-image.jpg'}
                                        className='h-full w-full object-cover'
                                        alt={data.name || 'Banner Image'}
                                    />
                                </div>

                                {/* Navigation Buttons */}
                                <div className='absolute top-0 w-full h-full items-center min-h-screen hidden justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white text-xl rounded-full z-10 p-1 text-black'>
                                        <FaAngleLeft />
                                    </button>

                                    <button onClick={handleNext} className='bg-white text-xl rounded-full z-10 p-1 text-black'>
                                        <FaAngleRight />
                                    </button>
                                </div>

                                {/* Gradient Overlay */}
                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                                <div className='container mx-auto'>
                                    <div className='w-full absolute bottom-0 max-w-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-3xl'>{data.name || data.title}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>Popularity: {Number(data.popularity).toFixed(0)}</p>
                                        </div>
                                        <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                            Play Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome
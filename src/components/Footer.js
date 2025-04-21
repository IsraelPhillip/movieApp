import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-4'>
      <div className='flex flex-col sm:flex-row items-center gap-6 justify-center'>
        <Link to='/' className='hover:underline'>
          About
        </Link>
        <Link to='/' className='hover:underline'>
          Contact
        </Link>
      </div>

      <p className='text-sm mt-2 sm:mt-4 font-semibold'>
        Created by <span className='text-white'>Israel PhiLL</span>
      </p>

      {/* Social Media Icons (Optional) */}
      <div className='mt-2 flex justify-center gap-4'>
        <a href='https://github.com/yourprofile' target='_blank' rel='noopener noreferrer'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6 text-neutral-400 hover:text-white'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 3v18m9-9H3' />
          </svg>
        </a>
        <a href='https://twitter.com/yourprofile' target='_blank' rel='noopener noreferrer'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6 text-neutral-400 hover:text-white'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 19c3 0 5.5-2.5 5.5-5.5S11 8 8 8 2.5 10.5 2.5 13.5 5 19 8 19zM4.5 13.5l1.5 1 1-1.5M10 11l-1 1.5 1.5 1.5' />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer

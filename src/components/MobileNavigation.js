import React from 'react'
import { NavLink } from 'react-router-dom'
import { MobileNavigation as NavConfig } from '../constant/Navigation'
const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
        <div className='flex items-center justify-between h-full text-neutral-400 '>
            {
                NavConfig.map((nav,index)=>{
                    return(
                        <NavLink
                         key={nav.label +'mobilenavigation'}
                         to={nav.href}
                          className={({isActive})=>`px-3 flex items-center flex-col justify-center ${isActive && 'text-white'} `}>
                            <div className='text-2xl'>
                                {nav.icon}
                            </div>
                            <p className='text-5m'>{nav.label}</p>
                        </NavLink>
                    )
                })
            }
        </div>
    </section>
     
    
  )
}

export default MobileNavigation

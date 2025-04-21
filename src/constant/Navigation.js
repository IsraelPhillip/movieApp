import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const Navigation = [
    {
        label: 'TV Shows',
        href: 'tv',
        icon: <PiTelevisionFill/>
    },
    {
        label: 'Movies',
        href: 'movie',
        icon: <BiSolidMoviePlay/>
    }
]

export const MobileNavigation =[
    {
        label: 'Home',
        href: '/',
        Icon: <MdHomeFilled/>
    },
    ...Navigation,
    {
        label:'Search',
        href:'/search',
        icon:<IoSearchOutline/>
    }
]

export default Navigation
import React from 'react'
import {Link} from 'react-router-dom'

export default function Logo({size = '70px'}) {
    return (
        <Link to='/'>
            <div className="flex w-max items-center gap-2 justify-between">
                <img src={'/images/logo.png'} width={size} alt="logo"/>
                <span className='text-4xl font-roboto-slab font-bold '>GEKO</span>
            </div>
        </Link>

    )
}

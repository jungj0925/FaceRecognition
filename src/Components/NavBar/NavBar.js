import React from 'react';
import Navigation from './Navigation/Navigation';
import logo from './logo.png';

const NavBar = () => {
    return (
        <div className='bg-black' style={{ height: '6em'}}>
            <img src={logo} alt='logo' className='fl h-75 w-auto pointer pa3'/>
            <Navigation />
        </div>
    )
}

export default NavBar
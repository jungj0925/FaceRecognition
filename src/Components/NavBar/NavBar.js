import React from 'react';
import Navigation from './Navigation/Navigation';
import logo from './logo.png';

const NavBar = () => {
    return (
        <div className='bg-black' style={{ height: '6em', top: '0px', position: 'fixed', width: '100%'}}>
            <img src={logo} alt='logo' className='fl w-auto pointer pa3 image'/>
            <Navigation />
        </div>
    )
}

export default NavBar
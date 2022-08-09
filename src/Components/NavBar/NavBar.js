import React from 'react';
import Navigation from './Navigation/Navigation';
import logo from './logo.png';

const NavBar = ({ onRouteChange, isSignedIn }) => {
    return (
        <div className='bg-black navbar' style={{ height: '6em', top: '0px', position: 'fixed', width: '100%'}}>
            <img src={logo} alt='logo' className='fl w-auto pointer pa3 image'/>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
        </div>
    )
}

export default NavBar
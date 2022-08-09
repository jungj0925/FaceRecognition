import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f5 link dim black pa3 ma3 pointer white'>Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('Signin')} className='f5 link dim black pa3 ma3 pointer white'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f5 link dim black pa3 ma3 pointer white'>Register</p>
            </nav>
        )
    }
}

export default Navigation;
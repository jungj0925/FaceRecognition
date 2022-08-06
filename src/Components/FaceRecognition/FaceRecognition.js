import React from 'react'

const FaceRecognition = ({ url }) => {
    return (
        <div className='center pb4 ma'>
            <div className='absolute'>
                <img src={ url } alt='' width='500px' height='auto'/>
            </div>
        </div>
    );
}

export default FaceRecognition
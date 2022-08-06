import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div style={{padding: '2em'}}>
            <p className='f4 pb3'>
                {'This Magic Brain will detect faces in your pictures. Submit a link of an image to try it out!'}
            </p>
            <div className='center'>
                <div className='br-pill shadow-5 form center w50 pa5'>
                    <input type='text' className='f5 pa2 w-60' onChange={onInputChange}/>
                    <button className='w-40 grow f5 link ph3 pv2 dib white bg-black' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
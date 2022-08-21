import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f4 pt6'>
                {'⠀'}
            </div>
            <div className='black f1'>
                {`${name}, Your current entry count is ${entries}`}
            </div>
        </div>
    )
}

export default Rank;
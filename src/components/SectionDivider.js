import React from 'react';

const SectionDivider = () => {
    let style = {
        width: '100%',
        height: 0,
        borderBottom: '1px solid #e6e6e6',
        margin: '10px 0',
    };

    return (
        <div className='section-divider' style={style}/>
    );
};

export default SectionDivider;
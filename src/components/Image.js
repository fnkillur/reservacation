import React from 'react';

const Image = (props) => {    
    let styles = {
        margin: '0',
        padding : '0',
        width : '100%',
        height : '100%',
    };
    
    return (
        <img src={props.src} alt={props.alt} onError={props.onerror} style={styles} />
    );
};

export default Image;
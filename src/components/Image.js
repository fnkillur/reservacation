import React from 'react';
import PropTypes from 'prop-types';

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

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onError: PropTypes.string,
};

export default Image;
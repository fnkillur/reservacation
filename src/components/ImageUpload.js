import React from 'react';
import PropTypes from 'prop-types';

const ImageUpload = (props) => {
    return (
        <input
            type='file'
            name={props.name}
            onChange={props.onChange} />
    );
};

ImageUpload.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default ImageUpload;
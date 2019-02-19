import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faImage } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faImage);

const ImageUpload = (props) => {
    let labelStyle = {
        cursor: 'pointer'
    };

    return (
        <div>
            <label htmlFor='imgUpload' style={labelStyle}>
                <FontAwesomeIcon icon={faImage} style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                <span style={{ verticalAlign: 'middle', marginLeft: '5px' }}>사진 올리기</span>
            </label>
            <input
                type='file'
                id='imgUpload'
                name={props.name}
                onChange={props.onChange}
                style={{ display: 'none' }} />
        </div>
    );
};

ImageUpload.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default ImageUpload;
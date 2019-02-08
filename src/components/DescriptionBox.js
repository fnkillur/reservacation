import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from '../_common/const/const';

const DescriptionBox = (props) => {
    let width = (isMobile && '') || '100%';
    let styles = {
        margin: '0',
        padding: '0',
        width: width,
        height: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: props.whiteSpace || 'nowrap',
    };

    return (
        <p style={styles}>{props.contents}</p>
    );
};

DescriptionBox.propTypes = {
    contents: PropTypes.string.isRequired,
    whiteSpace: PropTypes.string
};

export default DescriptionBox;
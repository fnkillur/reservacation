import React from 'react';
import PropTypes from 'prop-types';

const TitleBox = (props) => {
    let styles = {
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
    };

    return (
        <span style={styles}>{props.contents}</span>
    );
}

TitleBox.propTypes = {
    contents: PropTypes.string.isRequired,
};

export default TitleBox;
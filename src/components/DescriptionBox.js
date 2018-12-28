import React from 'react';

const DescriptionBox = (props) => {
    let styles = {
        margin: '0',
        padding: '0',
        width: '345px',
        height: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    };

    return (
        <p style={styles}>{props.contents}</p>
    );
}

export default DescriptionBox;
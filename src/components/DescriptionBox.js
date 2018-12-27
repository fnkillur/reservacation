import React from 'react';

const DescriptionBox = (props) => {
    let styles = {
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100%',
        textOverflow: 'ellipsis',
    }

    return (
        <p style={styles}>{props.contents}</p>
    );
}

export default DescriptionBox;
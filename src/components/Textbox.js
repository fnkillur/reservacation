import React from 'react';

const Textbox = (props) => {
    let styles = {
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100%',
        textOverflow: 'ellipsis',
    }

    return (
        <div style={styles}>{props.contents}</div>
    );
}

export default Textbox;
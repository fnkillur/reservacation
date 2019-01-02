import React from 'react';

const TitleBox = (props) => {
    let styles = {
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100%',
        'font-weight': 'bold',
    }

    return (
        <span style={styles}>{props.contents}</span>
    );
}

export default TitleBox;
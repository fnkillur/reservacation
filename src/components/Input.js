import React from 'react';

const Input = (props) => {
    let style = {
        boxSizing: 'border-box',
        borderRadius: '5px',
        padding: '10px',
        margin: '0',
        width: '100%',
        fontSize: '13px',
        backgroundColor: '#fafbfc',
        border: '1px solid #d1d5da',
    };

    return (
        <input style={style}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            type={props.type || 'text'}
            name={props.name}
        />
    );
};

export default Input;
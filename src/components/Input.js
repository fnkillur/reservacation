import React from 'react';
import PropTypes from 'prop-types';

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

Input.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string
};

export default Input;
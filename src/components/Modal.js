import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
    render() {
        const { show, onClose, children } = this.props;

        if (!show) {
            return null;
        }

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <header className='header'>
                        <button onClick={() => onClose()}>X</button>
                    </header>
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
    no: PropTypes.number,
};

export default Modal;
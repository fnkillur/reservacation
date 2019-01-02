import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <header>
                        <button onClick={this.props.onClose}>X</button>
                    </header>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
};

export default Modal;
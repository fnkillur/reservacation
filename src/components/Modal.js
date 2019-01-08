import React, { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Modal extends Component {
    render() {
        const { to, children } = this.props;

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <Link to={to} style={{ textDecoration: 'none' }}><button className='btn-close'>X</button></Link>
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default Modal;
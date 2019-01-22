import React, { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faTimes } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faTimes);

class Modal extends Component {
    render() {
        const { to, children } = this.props;

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <section className='close'>
                        <Link to={to} style={{ textDecoration: 'none' }}><FontAwesomeIcon onClick={this.props.onClose} icon={faTimes} /></Link>
                    </section>
                    {this.props.children}
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
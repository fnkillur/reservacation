import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.scss';
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faTimes } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faTimes);

class Modal extends Component {
    render() {
        const { to, children } = this.props;

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <header>
                        <FontAwesomeIcon onClick={this.props.onClose} icon={faTimes}/>
                    </header>
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
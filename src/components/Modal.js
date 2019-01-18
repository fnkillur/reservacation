import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.scss';
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faTimes } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faTimes);

class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

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
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
};

export default Modal;
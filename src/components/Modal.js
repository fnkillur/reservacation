import React, { Component } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faTimes, faAngleLeft } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faTimes);
fontawesome.library.add(faAngleLeft);

class Modal extends Component {
    render() {
        const { to, hasBtnBack, children, onClose } = this.props;

        return (
            <div className='backdrop'>
                <div className='modal'>
                    <section className='buttons'>
                        <div className={(hasBtnBack && 'btn-back') || 'btn-none'}>
                            <Link to={to} style={{ textDecoration: 'none', verticalAlign: 'middle' }}>
                                <FontAwesomeIcon icon={faAngleLeft} style={{ width: '100%', height: '100%' }} />
                            </Link>
                        </div>
                        <div className='btn-close'>
                            <Link to='/stores' style={{ textDecoration: 'none', verticalAlign: 'middle' }}>
                                <FontAwesomeIcon onClick={onClose} icon={faTimes} style={{ width: '100%', height: '100%' }} />
                            </Link>
                        </div>
                    </section>
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
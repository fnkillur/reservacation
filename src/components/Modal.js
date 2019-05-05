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
        const { to, hasBtnBack, children } = this.props;

        return (
            <section className='backdrop'>
                <article className='modal'>
                    <section className='buttons'>
                        <div className={(hasBtnBack && 'btn-back') || 'btn-none'}>
                            <Link to={to || '/stores'}>
                                <FontAwesomeIcon icon={faAngleLeft} style={{ width: '100%', height: '100%' }} />
                            </Link>
                        </div>
                        <div className='btn-close'>
                            <Link to='/stores'>
                                <FontAwesomeIcon icon={faTimes} style={{ width: '100%', height: '100%' }} />
                            </Link>
                        </div>
                    </section>
                    {children}
                </article>
            </section>
        );
    }
}

Modal.propTypes = {
    to: PropTypes.string,
    hasBtnBack: PropTypes.bool.isRequired,
    children: PropTypes.node
};

export default Modal;
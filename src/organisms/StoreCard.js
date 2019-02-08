import React from 'react';
import Image from '../components/Image';
import DescriptionBox from '../components/DescriptionBox';
import TitleBox from '../components/TitleBox';
import './StoreCard.scss';
import PropTypes from 'prop-types';

const StoreCard = (props) => {
    const { imgSrc, imgAlt, name, address, tel, description, whiteSpace } = props;
    
    return (
        <article className='store-card'>
            <section className='store-img'>
                <Image
                    src={imgSrc}
                    alt={imgAlt} />
            </section>
            <section className='store-contents'>
                <section className='store-title'>
                    <TitleBox contents={name} />
                </section>
                <section className='store-description'>
                    <DescriptionBox contents={address} whiteSpace={whiteSpace} />
                    <DescriptionBox contents={tel} />
                    <DescriptionBox contents={description} />
                </section>
            </section>
        </article>
    );
};

StoreCard.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    tel: PropTypes.string,
    description: PropTypes.string,
};

export default StoreCard;
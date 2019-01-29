import React from 'react';
import Image from '../components/Image';
import DescriptionBox from '../components/DescriptionBox';
import './ReviewCard.scss';
import PropTypes from 'prop-types';

const ReviewCard = (props) => {
    return (
        <article className='review-card'>
            <section className='img'>
                <Image
                    src={props.imgSrc}
                    alt={props.imgAlt} />
            </section>
            <section className='description'>
                <DescriptionBox contents={props.description} />
            </section>
        </article>
    );
};

ReviewCard.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    description: PropTypes.string.isRequired,
};

export default ReviewCard;
import React from 'react';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
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
            <section className='title'>
                <TitleBox contents={props.title} />
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ReviewCard;
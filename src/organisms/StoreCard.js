import React, { Component } from 'react';
import Image from '../components/Image';
import DescriptionBox from '../components/DescriptionBox';
import TitleBox from '../components/TitleBox';
import './StoreCard.scss';

const StoreCard = (props) => {
    return (
        <article>
            <section className='store-img'>
                <Image
                    src={props.img_src}
                    alt={props.img_alt} />
            </section>
            <section className='store-contents'>
                <section className='store-title'>
                    <TitleBox contents={props.store_name} />
                </section>
                <section className='store-description'>
                    <DescriptionBox contents={props.store_address} />
                    <DescriptionBox contents={props.store_tel} />
                    <DescriptionBox contents={props.store_description} />
                </section>
            </section>
        </article>
    );
}

export default StoreCard;
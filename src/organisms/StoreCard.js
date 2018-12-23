import React, { Component } from 'react';
import Image from '../components/Image';
import Textbox from '../components/Textbox';
import './StoreCard.sass'

class StoreCard extends Component {
    render() {
        return (
            <article>
                <section className='store-img'>
                    <Image
                        src='data:image/png;base64,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'
                        alt='테스트' />
                </section>
                <section className='store-contents'>
                    <section className='store-title'>
                        <Textbox contents='CAFFE IN BUS' />
                    </section>
                    <section className='store-description'>
                        <Textbox contents='라페스타에 있는 카페 입니다.' />
                        <Textbox contents='메뉴판' />
                        <Textbox contents='라페스타에 있는 카페 입니다. 커피 4000원 커피 4000원커피 4000원커피 4000원커피 4000원' />
                        <Textbox contents='라페스타에 있는 카페 입니다. 커피 4000원 커피 4000원커피 4000원커피 4000원커피 4000원' />
                    </section>
                </section>
            </article>
        );
    }
}

export default StoreCard;
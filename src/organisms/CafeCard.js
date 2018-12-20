import React, { Component } from 'React';
import Image from '../components/Image';
import Textbox from '../components/Textbox';

class CafeCard extends Component {
    render() {
        return (
            <article className='container'>
                <Image src={} alt={} />
                <Textbox contents={} />
                <Textbox contents={} />
            </article>
        );
    }
}

export default CafeCard;
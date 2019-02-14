import React, { Component } from 'react';
import './ReviewForm.scss';
import Image from '../components/Image';
import ImageUpload from '../components/ImageUpload';

class ReviewForm extends Component {

    state = {
        file: '',
        imgSrc: '',
        description: '',
        storeId: this.props.storeId
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.file !== this.state.file)
            || (nextState.imgSrc !== this.state.imgSrc)
            || (nextState.description !== this.state.description);
    }

    handleUpload = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imgSrc: reader.result
            });
        }
        reader.readAsDataURL(file)
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            file: '',
            imgSrc: '',
            description: '',
            storeId: this.props.storeId
        })
    };

    render() {
        return (
            <form className='review-form' onSubmit={this.handleSubmit}>
                <section className='upload-input'>
                    <section className='image'>
                        <section className='thumbnail'>
                            <Image src={this.state.imgSrc} />
                        </section>
                        <section className='image-upload'>
                            <ImageUpload
                                name='imgSrc'
                                onChange={this.handleUpload}
                            />
                        </section>
                    </section>
                    <textarea className='contents' name='description' onChange={this.handleChange}></textarea>
                </section>
                <section className='upload-button'>
                    <button className='btn-upload' type='submit'>리뷰 등록하기</button>
                </section>
            </form>
        );
    }
}

export default ReviewForm;
import React, {Component} from 'react';
import './ReviewForm.scss';
import ImageUpload from '../../components/ImageUpload';

class ReviewForm extends Component {

  state = {
    reviewImg: '',
    description: '',
    storeId: this.props.storeId
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.file !== this.state.file)
      || (nextState.imgSrc !== this.state.imgSrc)
      || (nextState.description !== this.state.description);
  }

  handleUpload = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('reviewImg', this.state.reviewImg);
    formData.append('description', this.state.description);
    formData.append('storeId', this.props.storeId);

    this.props.onCreate(formData);
    this.setState({
      reviewImg: '',
      description: '',
      storeId: this.props.storeId
    });
  };

  render() {
    return (
      <form className='review-form' onSubmit={this.handleSubmit}>
        <section className='upload-input'>
          <textarea
            className='contents'
            name='description'
            cols='30'
            onChange={this.handleChange}
            placeholder='어떠한 점이 좋았나요?'
          />
          <section className='image-upload'>
            <ImageUpload
              name='reviewImg'
              onChange={this.handleUpload}
            />
          </section>
        </section>
        <section className='upload-button'>
          <button className='btn-upload' type='submit'>리뷰 등록하기</button>
        </section>
      </form>
    );
  }
}

export default ReviewForm;
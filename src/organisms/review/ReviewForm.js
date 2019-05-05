import React, {PureComponent} from 'react';
import './ReviewForm.scss';
import ImageUpload from '../../components/ImageUpload';

class ReviewForm extends PureComponent {

  render() {
    return (
      <form className='review-form' onSubmit={this.props.handleSubmit}>
        <textarea
          className='contents'
          name='description'
          cols='30'
          value={this.props.review.description}
          onChange={this.props.handleChange}
          placeholder='어떠한 점이 좋았나요?'
        />
        <ImageUpload
          name='reviewImg'
          value={this.props.review.reviewImg}
          onChange={this.props.handleChange}
        />
        <button className='btn-upload' type='submit'>리뷰 등록하기</button>
      </form>
    );
  }
}

export default ReviewForm;
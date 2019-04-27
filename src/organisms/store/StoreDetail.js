import React, {Component} from 'react';
import './StoreDetail.scss';
import Image from '../../components/Image';
import TitleBox from '../../components/TitleBox';
import SectionDivider from '../../components/SectionDivider';
import StoreCard from '../../organisms/store/StoreCard';

class StoreDetail extends Component {

  renderStoreCard = () => {
    const store = this.props.store.info;

    if (store) {
      return (
        <StoreCard
          imgSrc={store.img_src}
          imgAlt={store.store_name}
          name={store.store_name}
          address={store.address + store.detail_address}
          tel={store.store_tel}
          description={store.store_description}
          whiteSpace='pre-wrap'
        />
      );
    }
  };

  renderImages = () => {
    const images = this.props.store.images;

    if (images) {
      return images.map(img => {
        return (
          <div className='img' key={img.id}>
            <Image
              src={img.src}
              alt={this.props.store.info.store_name}/>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <section className='store-detail'>
        <section className='store-info'>
          {this.renderStoreCard()}
        </section>
        <SectionDivider/>
        <TitleBox contents={(this.props.store.images && `${this.props.store.info.store_name}의 분위기 넘치는 사진들`) || ''}/>
        <section className='img-list'>
          {this.renderImages()}
        </section>
        <SectionDivider/>
        <TitleBox contents={(this.props.store.images && `${this.props.store.info.store_name}의 생생한 리뷰들`) || ''}/>
      </section>
    );
  }
}

export default StoreDetail;
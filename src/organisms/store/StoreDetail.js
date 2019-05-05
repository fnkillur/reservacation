import React, {PureComponent} from 'react';
import './StoreDetail.scss';
import Image from '../../components/Image';
import TitleBox from '../../components/TitleBox';
import SectionDivider from '../../components/SectionDivider';
import StoreCard from '../../organisms/store/StoreCard';

class StoreDetail extends PureComponent {

  render() {
    const storeInfo = this.props.storeDetail.info;
    const storeImage = this.props.storeDetail.images;

    return (
      <section className='store-detail'>
        <section className='store-info'>
          {!storeInfo.store_name || <StoreCard
            imgSrc={storeInfo.img_src}
            imgAlt={storeInfo.store_name}
            name={storeInfo.store_name}
            address={`${storeInfo.address} ${storeInfo.detail_address}`}
            tel={storeInfo.store_tel}
            description={storeInfo.store_description}
            whiteSpace='pre-wrap'
          />}
        </section>
        <SectionDivider/>
        <TitleBox contents={(storeImage && `${storeInfo.store_name}의 분위기 넘치는 사진들`) || ''}/>
        <section className='img-list'>
          {storeImage.map(img => {
            return (
              <div className='img' key={img.id}>
                <Image
                  src={img.src}
                  alt={storeInfo.store_name}/>
              </div>
            );
          })}
        </section>
      </section>
    );
  }
}

export default StoreDetail;
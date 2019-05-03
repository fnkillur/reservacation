import React from 'react';
import './Pagination.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAngleRight} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faAngleRight);

const Pagination = ({reviewPageNo, perPageNo, totalPageCount, onClick, children}) => {

  const pageNo = parseInt(reviewPageNo);
  const buttonHandler = (handler, pageNo) => () => handler(pageNo, perPageNo);
  const leftHandler = buttonHandler(onClick, pageNo - 1);
  const rightHandler = buttonHandler(onClick, pageNo + 1);

  return (
    <div className='pagination'>
      <section className={(pageNo === 0 && 'hide') || 'btn-left'}>
        <FontAwesomeIcon onClick={leftHandler} icon={faAngleLeft}/>
      </section>
      <section className='children'>
        {children}
      </section>
      <section className={((!totalPageCount || parseInt(totalPageCount) === pageNo + 1) && 'hide') || 'btn-right'}>
        <FontAwesomeIcon onClick={rightHandler} icon={faAngleRight}/>
      </section>
    </div>
  );
};

export default Pagination;
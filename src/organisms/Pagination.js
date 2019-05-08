import React from 'react';
import './Pagination.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAngleRight} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faAngleRight);
fontawesome.library.add(faAngleLeft);

const Pagination = ({activePage, totalPageCount, children, pageAction}) => {

  const pageNo = parseInt(activePage);
  const makeHandler = nextPage => () => pageAction(nextPage);
  const handleLeft = makeHandler(pageNo - 1);
  const handleRight = makeHandler(pageNo + 1);

  return (
    <div className='pagination'>
      <section className={(pageNo === 0 && 'hide') || 'btn-left'}>
        <FontAwesomeIcon icon={faAngleLeft} onClick={handleLeft}/>
      </section>
      <section className='children'>
        {children}
      </section>
      <section className={((parseInt(totalPageCount) === pageNo + 1) && 'hide') || 'btn-right'}>
        <FontAwesomeIcon icon={faAngleRight} onClick={handleRight}/>
      </section>
    </div>
  );
};

export default Pagination;
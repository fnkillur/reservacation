import React from 'react';
import './Pagination.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAngleRight} from '@fortawesome/fontawesome-free-solid'
import {Link} from "react-router-dom";

fontawesome.library.add(faAngleRight);

const Pagination = ({reviewPageNo, perPageNo, totalPageCount, onClick, children}) => {

  const pageNo = parseInt(reviewPageNo);

  return (
    <div className='pagination'>
      <section className={(pageNo === 0 && 'hide') || 'btn-left'}>
        <Link to={`?reviewPageNo=${pageNo - 1}&perPageNo=${perPageNo}`}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </Link>
      </section>
      <section className='children'>
        {children}
      </section>
      <section className={((parseInt(totalPageCount) === pageNo + 1) && 'hide') || 'btn-right'}>
        <Link to={`?reviewPageNo=${pageNo + 1}&perPageNo=${perPageNo}`}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </Link>
      </section>
    </div>
  );
};

export default Pagination;
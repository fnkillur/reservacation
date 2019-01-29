import React, { Component } from 'react';
import './Pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faAngleRight);

class Pagination extends Component {
    render() {
        const { perPageNo, totalPageCount, onClick } = this.props;
        let pageNo = parseInt(this.props.pageNo);
        let classLeft = (pageNo === 1 && 'hide') || 'btn-left';
        let classRight = ((!totalPageCount || parseInt(totalPageCount) === pageNo) && 'hide') || 'btn-right';

        return (
            <div className='pagination'>
                <section className={classLeft}>
                    <FontAwesomeIcon onClick={() => { onClick(pageNo - 1, perPageNo) }} icon={faAngleLeft} />
                </section>
                <section className='children'>
                    {this.props.children}
                </section>
                <section className={classRight}>
                    <FontAwesomeIcon onClick={() => { onClick(pageNo + 1, perPageNo) }} icon={faAngleRight} />
                </section>
            </div>
        );
    }
}


export default Pagination;
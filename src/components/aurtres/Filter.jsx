import React from 'react';
import ItemFilter from './Item_filter';

const Filter = ({filterArr, page }) => {

    const filter_produit_arr = []
    filterArr.forEach((filterName, i) => {
        filter_produit_arr.push(
            <ItemFilter key={i} filtreValue={filterName}  page={page}  />
            )
    });

    return (
        <div className='filter'>
            <div className="filter_option">
               {filter_produit_arr}
            </div>

        </div>
    );
};

export default Filter;


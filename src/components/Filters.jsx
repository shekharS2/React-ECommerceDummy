import { useState } from 'react';
import './Filters.css';

function Filters(props) {
    const [highestRated, setHighestRated] = useState(false);
    const [priceAsc, setPriceAsc] = useState(false);
    const [priceDesc, setPriceDesc] = useState(false);

    const handleHighestRated = () => {
        props.sortByHighestRated();
        setHighestRated(true);
        setPriceAsc(false);
        setPriceDesc(false);
    }

    const handlePriceAsc = () => {
        props.sortByPriceAsc();
        setPriceAsc(true);
        setHighestRated(false);
        setPriceDesc(false);
    }

    const handlePriceDesc = () => {
        props.sortByPriceDesc();
        setPriceDesc(true);
        setHighestRated(false);
        setPriceAsc(false);
    }

    const handleClear = () => {
        props.clearFilters();
        setPriceDesc(false);
        setHighestRated(false);
        setPriceAsc(false);
    }

    return (
        <div className="filters">
            <p className={highestRated ? 'each-filter active' : 'each-filter'} onClick={handleHighestRated} >Highest Rated</p>
            <p className={priceAsc ? 'each-filter active' : 'each-filter'} onClick={handlePriceAsc} >Price : Ascending</p>
            <p className={priceDesc ? 'each-filter active' : 'each-filter'} onClick={handlePriceDesc} >Price : Descending</p>
            {(highestRated || priceAsc || priceDesc) && <p className="clear-filter" onClick={handleClear} >CLEAR ALL FILTERS</p>}
        </div>
    );
}

export default Filters;
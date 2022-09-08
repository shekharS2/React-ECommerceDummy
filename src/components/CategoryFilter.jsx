import { useEffect, useState } from "react";

import './CategoryFilter.css';

const CategoryFilter = (props) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
		const fetchCategories = async () => {
			const res = await fetch('https://fakestoreapi.com/products/categories');
			const categoriesRes = await res.json();

			setCategories(categoriesRes);
		};

		fetchCategories();
	}, []);

    
    const handleFilterSelected = (e) => {
        if(e.target.value === 'Select a category') {
            return;
        }
        props.handleCategoryFilter(e.target.value);
    }


    return (
        <div className="category-filter">
            <select className="category-filter__drop-down" onChange={handleFilterSelected} > 
                <option value="Select a category"> -- Select a category to filter -- </option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select> 
        </div>

    );
};

export default CategoryFilter;
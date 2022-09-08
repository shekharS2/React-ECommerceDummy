import { useEffect, useState } from 'react';
import ProductTile from './components/ProductTile';

import './App.css';
import ProductPage from './components/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';

function App() {	
	const [productList, updateProductList] = useState();
	const [showProdPage, setShowProdPage] = useState(false);
	const [productPageId, setProdPageId] = useState(null);
	const [categoryFilterOn, setCategoryFilterOn] = useState(false);
	const [filteredProdList, setFilteredProdList] = useState();
	
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://fakestoreapi.com/products');
			const resData = await res.json();
			updateProductList(resData);
		}
		fetchData();
  	}, []);

	if(!productList) {
		return <div className="app__loading">
			<h1>Loading...</h1>
		</div>;
	}

	const handleShowProdPage = (prodId) => {
		setShowProdPage(prev => !prev);
		setProdPageId(prodId);
	}

	const handleCategoryFilter = (category) => {
		// if(category === 'Select a category') {
		// 	setCategoryFilterOn(false);
		// 	setFilteredProdList([]);
		// 	return;
		// }

		setCategoryFilterOn(true);
		const tempFilteredProds = productList.filter(prod => prod.category === category);
		setFilteredProdList(tempFilteredProds);
	}

	const handleClearCategoryFilter = () => {
		setCategoryFilterOn(false);
		setFilteredProdList([]);
	}

	return (
		<div className="app">
			<Header headerText={showProdPage ? 'Product Page' : 'All Products'} />
			{!showProdPage && 
			<div className='app__filter'>
				<span>
					<CategoryFilter handleCategoryFilter={handleCategoryFilter} handleClearCategoryFilter={handleClearCategoryFilter} />
				</span>
				<button className='app__clear-filter-btn' onClick={handleClearCategoryFilter}>Clear Filter</button>
			</div>}
			<div className='app-container'>
				{showProdPage && productPageId ? 
				<ProductPage prodId={productPageId} handleShowProdPage={handleShowProdPage} />
				:
				<div className='all-product-tiles-container'>
					{!categoryFilterOn && productList.map((prod) => <ProductTile key={prod.id} prod={prod} handleShowProdPage={handleShowProdPage} />)}
					{categoryFilterOn && filteredProdList.map((prod) => <ProductTile key={prod.id} prod={prod} handleShowProdPage={handleShowProdPage} />)}
					
				</div>}
			</div>
			<Footer />
		</div>
	);
}

export default App;

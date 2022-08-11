import { useEffect, useRef, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import PLP from './components/PLP';
import allProds from './data';
import Filters from './components/Filters';
import AddProductForm from './components/AddProductForm';

import './App.css';
import EditProductForm from './components/EditProductForm';

//get data from local storage
const getLocalItems = () => {
	let prodsStrData = localStorage.getItem('productList');
	if(prodsStrData) {
		return JSON.parse(prodsStrData);
	} else {
	  return [];
	}
}

function App() {
	const firstUpdate = useRef(true);
	
	const [productList, updateProductList] = useState(firstUpdate ? [...allProds] : getLocalItems()); //useState([...allProds]);
	const [showCart, updateShowCart] = useState(false);
	const [cartData, updateCartData] = useState([]);
	const [searchOn, updateSearchOn] = useState(false);
	const [searchedProductList, updateSearchedProductList] = useState([]);
	const [filtersOn, updateFiltersOn] = useState(false);
	const [filteredProductList, updateFilteredProductList] = useState([]);
	const [showAddProductForm, updateShowAddProductForm] = useState(false);
	const [showEditForm, updateShowEditForm] = useState(false);
	const [productToEdit, updateProductToEdit] = useState({});
	
	
	//add productList to local storage
	useEffect(() => {
		localStorage.setItem('productList', JSON.stringify(productList));
		// if (firstUpdate.current) {
			// 	firstUpdate.current = false;
		// 	localStorage.setItem('productList', JSON.stringify(allProds));
		// }else {
		// 	localStorage.setItem('productList', JSON.stringify(productList));
		// }
  	}, [productList]);

	// Click on Navbar heading to go to PLP
	const handleNavbarHeadingClick = () => {
		updateShowCart(false);
		updateSearchOn(false)
		updateFiltersOn(false);
		updateShowAddProductForm(false);
		updateShowEditForm(false);

		updateSearchedProductList([]);
		updateFilteredProductList([]);
	}
	

	// Search Feature
	const handleSearch = (searchString) => {
		if(showCart || showAddProductForm || showEditForm) {
			updateShowCart(false);
			updateShowAddProductForm(false);
			updateShowEditForm(false);
		}

		if(filtersOn) {
			updateFilteredProductList([]);
			updateFiltersOn(false);
		}

		const updatedFilteredProductList = productList.filter((prod) => prod.name.toLowerCase().includes(searchString.toLowerCase()) || prod.category.toLowerCase().includes(searchString.toLowerCase()));
		updateSearchedProductList([...updatedFilteredProductList]);
		updateSearchOn(true);
	}
	
	// Turn Off Search Feature
	const handleClearSearch = () => {
		updateSearchedProductList([]);
		updateSearchOn(false);
		updateFilteredProductList([]);
		updateFiltersOn(false);
	}

	// Filter - Highest Rating
	const sortByHighestRated = () => {
		if(searchOn) {
			const updatedSearchList = [...searchedProductList].sort((prod1, prod2) => prod2.rating - prod1.rating);
			updateFilteredProductList([...updatedSearchList]);
			updateFiltersOn(true);
		} else {
			const updatedProductList = [...productList].sort((prod1, prod2) => prod2.rating - prod1.rating);
			updateFilteredProductList([...updatedProductList]);
			updateFiltersOn(true);
		}

	}

	// Filter - Price : Ascending
	const sortByPriceAsc = () => {
		if(searchOn) {
			const updatedSearchList = [...searchedProductList].sort((prod1, prod2) => prod1.price - prod2.price);
			updateFilteredProductList([...updatedSearchList]);
			updateFiltersOn(true);
		} else {
			const updatedProductList = [...productList].sort((prod1, prod2) => prod1.price - prod2.price);
			updateFilteredProductList([...updatedProductList]);
			updateFiltersOn(true);
		}
	}

	// Filter - Price : Descending
	const sortByPriceDesc = () => {
		if(searchOn) {
			const updatedSearchList = [...searchedProductList].sort((prod1, prod2) => prod2.price - prod1.price);
			updateFilteredProductList([...updatedSearchList]);
			updateFiltersOn(true);
		} else {
			const updatedProductList = [...productList].sort((prod1, prod2) => prod2.price - prod1.price);
			updateFilteredProductList([...updatedProductList]);
			updateFiltersOn(true);
		}
	}

	// Clear Filters
	const clearFilters = () => {
		updateFilteredProductList([]);
		updateFiltersOn(false);
	}

	// Show screen to add product
	const handleShowAddProdScreen = () => {
		if(searchOn || filtersOn) {
			updateSearchedProductList([]);
			updateSearchOn(false);
			updateFilteredProductList([]);
			updateFiltersOn(false);
		}
		updateShowAddProductForm(prev => !prev);
	}
				
	// Add Product
	const handleCreateNewProduct = (newProduct) => {
		updateProductList(prev => [...prev, newProduct]);
		handleShowAddProdScreen();
	}
	
	// Show screen to edit product
	const handleShowEditProdScreen = () => {
		if(searchOn || filtersOn) {
			updateSearchedProductList([]);
			updateSearchOn(false);
			updateFilteredProductList([]);
			updateFiltersOn(false);
		}
		updateShowEditForm(prev => !prev);
	}

	// Set state for product to be edited
	const handleSetEditProduct = (product) => {
		updateProductToEdit({...product});
	}

	// Edit Product
	const handleEditForm = (editedProduct) => {
		// update product list
		const updatedProductList = productList.map((prod) => {
			if(prod.id === editedProduct.id) {
				return {
					...editedProduct
				};
			} else {
				return prod;
			}
		});

		updateProductList([
			...updatedProductList
		]);

		// update cart data
		const updatedCartData = cartData.map((prod) => {
			if(prod.id === editedProduct.id) {
				return {
					...editedProduct
				};
			} else {
				return prod;
			}
		});

		updateCartData([
			...updatedCartData
		]);

		updateProductToEdit({});

		handleShowEditProdScreen();
	}

	// Add to Wishlist
	const addOrRemoveFromWishList = (product) => {
		// update product list
		const updatedProductList = productList.map((prod) => {
			if(prod.id === product.id) {
				return {
					...prod,
					addedToWishList: !prod.addedToWishList
				};
			} else {
				return prod;
			}
		});

		updateProductList([
			...updatedProductList
		]);

		// update cart data
		const updatedCartData = cartData.map((prod) => {
			if(prod.id === product.id) {
				return {
					...prod,
					addedToWishList: !prod.addedToWishList
				};
			} else {
				return prod;
			}
		});

		updateCartData([
			...updatedCartData
		]);

		// update search data
		if(searchOn) {
			const updatedSearchedProductList = searchedProductList.map((prod) => {
				if(prod.id === product.id) {
					return {
						...prod,
						addedToWishList: !prod.addedToWishList
					};
				} else {
					return prod;
				}
			});
	
			updateSearchedProductList([
				...updatedSearchedProductList
			]);
		}

		// update filtered data
		if(filtersOn) {
			const updatedFilteredProductList = filteredProductList.map((prod) => {
				if(prod.id === product.id) {
					return {
						...prod,
						addedToWishList: !prod.addedToWishList
					};
				} else {
					return prod;
				}
			});
	
			updateFilteredProductList([
				...updatedFilteredProductList
			]);
		}
	}

	// Delete Product
	const deleteProduct = (product) => {
		const updatedProductList = productList.filter(prod => prod.id !== product.id);

		updateProductList([
			...updatedProductList
		]);

		const updatedCartData = cartData.filter(prod => prod.id !== product.id);

		updateCartData([
			...updatedCartData
		]);

		if(searchOn) {
			const updatedSearchedProductList = searchedProductList.filter(prod => prod.id !== product.id);
	
			updateSearchedProductList([
				...updatedSearchedProductList
			]);
		}

		if(filtersOn) {
			const updatedFilteredProductList = filteredProductList.filter(prod => prod.id !== product.id);
	
			updateFilteredProductList([
				...updatedFilteredProductList
			]);
		}
	}

	// Add to Cart from Card	
    const handleCartDataUpdateFromPLP =(product, qty) => {
		const matchedProduct = cartData.find((prod) => {
			return prod.id === product.id
		});

		
		if(!matchedProduct) {
			updateCartData(prev => {
				return [
					...prev,
					{
						...product,
						qty: product.qty + qty
					}
				];
			});
		} else {
			const updatedCartData = cartData.map((prod) => {
				if(prod.id === product.id) {
					return {
						...prod,
						qty: prod.qty + qty
					};
				} else {
					return prod;
				}
			});
	
			updateCartData([
				...updatedCartData
			]);
		}
    }

	// Delete from cart from card
	const deleteFromCart = (product) => {
		const updatedCartData = cartData.filter(prod => prod.id !== product.id);
		updateCartData([...updatedCartData]);
	}

	// Update product qty from Cart Page
	const handleCartDataUpdateFromCartPage =(product, count) => {
		const updatedCartData = cartData.map((prod) => {
			if(prod.id === product.id) {
				return {
					...prod,
					qty: prod.qty > 1 ? prod.qty + count : (count === 1 ? prod.qty + count : prod.qty)
				};
			} else {
				return prod;
			}
		});

		updateCartData([...updatedCartData]);
  	}

	return (
		<div className="app">
			<div className="app-container">
				<Navbar 
					showCart={showCart}
					updateShowCart={updateShowCart} 
					totalProds={cartData.length}
					searchOn={searchOn}
					handleSearch={handleSearch} 
					handleClearSearch={handleClearSearch}
					handleShowAddProdScreen={handleShowAddProdScreen}
					handleNavbarHeadingClick={handleNavbarHeadingClick}
				/>

				{(showAddProductForm || showEditForm) ? (showAddProductForm ? <AddProductForm 
					handleCreateNewProduct={handleCreateNewProduct}
				/> : <EditProductForm
					productToEdit={productToEdit}
					handleEditForm={handleEditForm}
				 />)
				:
				<>
					{!showCart && <Filters
						sortByHighestRated={sortByHighestRated}
						sortByPriceAsc={sortByPriceAsc}
						sortByPriceDesc={sortByPriceDesc}
						clearFilters={clearFilters}
					/>}
					{!showCart && <div className='add-product-btn-div'>
						<p onClick={handleShowAddProdScreen}><b>ADD NEW PRODUCT</b> <span><FaPlusCircle /></span></p>
					</div>}
					{!showCart && <PLP 
						productList={searchOn ?  (filtersOn ? filteredProductList : searchedProductList): (filtersOn ? filteredProductList : productList)} 
						deleteProduct={deleteProduct} 
						handleCartDataUpdate={handleCartDataUpdateFromPLP} 
						addOrRemoveFromWishList={addOrRemoveFromWishList} 
						handleShowEditProdScreen={handleShowEditProdScreen}
						handleSetEditProduct={handleSetEditProduct}
						deleteFromCart={deleteFromCart}
					/>} 
					
					{showCart && <CartPage 
						cartData={cartData} 
						updateCartData={updateCartData} 
						handleCartDataUpdate={handleCartDataUpdateFromCartPage} 
					/>}
				</>
				}
			</div>
		</div>
	);
}

export default App;

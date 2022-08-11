import { useState } from 'react';
import { FaShoppingCart, FaWindowClose } from 'react-icons/fa';
import './Navbar.css';

function Navbar(props) {
	const [searchInput, setSearchInput] = useState("");

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value);
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			if(searchInput === "") {
				return;
			}
			props.handleSearch(searchInput);
		}
	}

	const handleClearSearchResults = () => {
		props.handleClearSearch();
		setSearchInput("");
	}

	const handleCartIconClick = () => {
		props.updateShowCart(prev => !prev);
	}

	const handleHeadingClick = () => {
		props.handleNavbarHeadingClick();
	}

	return (
		<div className="navbar">
			<div className='navbar-heading'>
				<h1 onClick={handleHeadingClick}>
					BlueKart
				</h1>
			</div>
			<div className='navbar-search'>
				<input 
					type="text" 
					placeholder="Type product name or product category and press 'Enter'"
					value={searchInput}
					onChange={handleSearchInput} 
					onKeyDown={handleKeyDown} 
				/>
				{props.searchOn ? <span className='navbar-search-close' onClick={handleClearSearchResults}><FaWindowClose /></span> : ""}
			</div>
			<div className='navbar-cart'>
				<div className='navbar-cart-container'>
					<span className='icon' onClick={handleCartIconClick}>
						<FaShoppingCart />
					</span>
					<span className='count'>
						<b>{props.totalProds}</b>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Navbar;

//width: 5%;
// display: flex;
// justify-content: flex-end;
// align-items: center;
// .navbar-cart-container {
    
// }
import { useEffect, useState } from 'react';

import { FaArrowCircleLeft } from "react-icons/fa";

import './ProductPage.css';

const ProductPage = (props) => {
	const [prod, setProd] = useState();

	useEffect(() => {
		const fetchProd = async () => {
			const res = await fetch(`https://fakestoreapi.com/products/${props.prodId}`);
			const prodRes = await res.json();

			setProd(prodRes);		
		};

		fetchProd();
	}, [props.prodId]);

	if(!prod) {
		return <div className="product__loading">
			<h1>Loading...</h1>
		</div>;
	}

	return (
		<div className="product" >
			<div className='product__back-pointer-div' onClick={() => props.handleShowProdPage(prod.id)}>
				<FaArrowCircleLeft />
			</div>
            <div className='product__img-div'>
                <img className="product__img" src={prod.image} alt={prod.title} />
            </div>
			<div className='product__info-div'>
				<h4>{prod.title}</h4>
				<p><b>Price: </b>{prod.price}</p>
				<p><b>Description: </b></p>
				<div className='product__desc'>
					<p>{prod.description}</p>
				</div>
				<p><b>Category: </b>{prod.category}</p>
				<p><b>Rate: </b>{prod.rating.rate}</p>
				<p><b>Count: </b>{prod.rating.count}</p>
			</div>
        </div>
	);
};

export default ProductPage;
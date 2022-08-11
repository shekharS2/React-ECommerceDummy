import { useState } from 'react';
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from 'react-icons/fa';

import "./Card.css";

function Card(props) {
    const [qty, updateQty] = useState(1);
    
    const handleAddToCart = () => {
        console.log(qty)
        props.handleCartDataUpdate(props.product, qty);
        updateQty(1);
    }

    const handleEditOption = () => {
        props.handleShowEditProdScreen();
        props.handleSetEditProduct(props.product);
    }

    return (
        <div className="card">
            <div className='card-other-actions'>
                <span onClick={() => {props.addOrRemoveFromWishList(props.product)}}>
                    {props.product.addedToWishList ? <FaHeart /> : <FaRegHeart /> }
                </span>
                <span onClick={handleEditOption}>
                    <FaEdit />  
                </span>
                <span onClick={() => {props.deleteProduct(props.product)}}>
                    <FaTrash />
                </span>
            </div>
            <div className="card-img">
                <img src={typeof props.product.img === 'object' ? URL.createObjectURL(props.product.img) : props.product.img} alt="" />
            </div>
            <div className="card-details">
                <h5>{props.product.name}</h5>
                <p><b>Price: </b>{props.product.price} INR</p>
                <p><b>Category: </b>{props.product.category}</p>
                <p><b>Rating: </b>{props.product.rating}</p>
                <p className="card-details-desc"><b>Desc: </b>{props.product.desc}</p>
            </div>
            <div className="card-btn">
                <div className="card-btn-qty">
                    <button onClick={() => updateQty(prev => (prev > 1 ? prev - 1 : prev))}><b>-</b></button>
                    <b>{qty}</b>
                    <button onClick={() => updateQty(prev => prev + 1)}><b>+</b></button>
                </div>
                <button className="card-btn-cart"  onClick={() => handleAddToCart()}><b>ADD TO CART</b></button>
                <button className="card-btn-cart" onClick={() => props.deleteFromCart(props.product)}><b>REMOVE FROM CART</b></button>
            </div>
        </div>
    );
}

export default Card;
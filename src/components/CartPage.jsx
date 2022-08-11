import { useEffect, useState } from "react";

import './CartPage.css';

function CartPage(props) {
    const [cartPrice, updateCartPrice] = useState(0);

    const updateCartTotalPrice = () => {
        let totalPrice = 0;
        props.cartData.forEach((product) => {
            totalPrice += product.price * product.qty;
        });

        updateCartPrice(totalPrice);
    }

    const handleRemoveItem = (id) => {
        const updatedCartData = props.cartData.filter((product) => {
            return product.id !== id;
        });

        props.updateCartData(updatedCartData);
    }

    useEffect(() => {
        updateCartTotalPrice();
    });

    return (
        <div className="cart-page">
            <div className="cart-page-container">
                <div className="cart-total-price">
                    <span><b>CART TOTAL: </b> {cartPrice} INR</span> 
                </div>
                {cartPrice === 0 && <div className="cart-message">
                    CART IS EMPTY!
                </div>}
                {props.cartData.map((product) => {
                    return <div className="cart-page-product" key={product.id}>
                        <div className="cart-page-img">
                            <img src={product.img} alt="" />
                            <p><b>{product.name}</b></p>
                        </div>
                        <div className="cart-page-btn-1">
                            <button onClick={() => props.handleCartDataUpdate(product, -1)}><b>-</b></button>
                            <b className="cart-page-prod-count">{product.qty}</b>
                            <button onClick={() => props.handleCartDataUpdate(product, 1)}><b>+</b></button>
                        </div>
                        <div className="cart-page-btn-2">
                            <span><b className="cart-page-total-price">{product.price * product.qty} INR</b></span>
                            <button onClick={() => handleRemoveItem(product.id)}><b>REMOVE</b></button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default CartPage;
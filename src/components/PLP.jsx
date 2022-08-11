import Card from './Card';

import './PLP.css';

function PLP(props) {
    return (
        <section className="plp">
            {props.productList.map((product) => {
                return <Card 
                    key={product.id} 
                    addOrRemoveFromWishList={props.addOrRemoveFromWishList} 
                    product={product} 
                    handleCartDataUpdate={props.handleCartDataUpdate}
                    deleteProduct={props.deleteProduct} 
                    handleShowEditProdScreen={props.handleShowEditProdScreen}
                    handleSetEditProduct={props.handleSetEditProduct}
                    deleteFromCart={props.deleteFromCart}
                />
            })}
        </section>
    );
}

export default PLP;
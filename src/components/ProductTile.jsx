import './ProductTile.css';

const ProductTile = (props) => {
    return (
        <div className="product-tile" onClick={() => props.handleShowProdPage(props.prod.id)}>
            <div className='product-title__img-div'>
                <img className="product-tile__img" src={props.prod.image} alt={props.prod.title} />
            </div>
            <h4>{props.prod.title}</h4>
            <p><b>Price: </b>{props.prod.price}</p>
            <p><b>Description: </b></p>
            <div className='product-tile__desc-div'>
                <p>{props.prod.description}</p>
            </div>
            <p><b>Category: </b>{props.prod.category}</p>
            <p><b>Rate: </b>{props.prod.rating.rate}</p>
            <p><b>Count: </b>{props.prod.rating.count}</p>
        </div>
    );
}

export default ProductTile;
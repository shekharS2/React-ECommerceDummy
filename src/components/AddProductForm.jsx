import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { HiOutlineArrowLeft } from "react-icons/hi";

import './AddProductForm.css';

function AddProductForm(props) {
    const categories = [
        { label: "Men's Clothing", value: "Men's Clothing" },
        { label: "Women's Clothing", value: "Women's Clothing" },
        { label: "Footwear", value: "Footwear" },
        { label: "Accessories", value: "Accessories" }
    ];

    const [category, setCategory] = useState("Select a category");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // list of key-value pairs
        const formDataObj = Object.fromEntries(formData); // creates an object from a list of key-value pairs
        
        if(category === 'Select a category') {
            setCategoryErrorMessage("Choose a category!")
            return;
        }
        setCategoryErrorMessage("");
        
        props.handleCreateNewProduct({
            id: uuid(),
            name: formDataObj.name,
            img: formDataObj.img,
            price: formDataObj.price,
            category: category,
            rating: formDataObj.rating,
            qty: 0,
            addedToWishList: false,
            desc: formDataObj.desc
        });
    }

    return (
        <div className="add-prod">
            <form className="form-container" onSubmit={handleFormSubmit}>
                <h2>ADD A NEW PRODUCT</h2>
                <input required={true} type="text" name='name' placeholder='Enter name' />
                <input  required={true} type="number" name='price' min="1" step="any" placeholder='Enter price' />
                <input type="file" name="img" accept=".png, .jpg, .jpeg*"></input>
                <select onChange={handleCategoryChange} required > 
                    <option value="Select a category"> -- Select a category -- </option>
                    {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select> 
                <p style={{color: "red"}}><b>{categoryErrorMessage}</b></p>   
                <input required={true} type="number" min="1" max="10" name='rating' placeholder='Enter rating of product' />
                <textarea required={true} name='desc' />
                <button type="submit" className='add-prod-btn'><b>ADD PRODUCT</b></button>
            </form>    
        </div>
    )
}

export default AddProductForm;
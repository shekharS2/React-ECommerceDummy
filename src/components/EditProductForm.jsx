import { useState } from 'react';
import { HiOutlineArrowLeft } from "react-icons/hi";

import './EditProductForm.css';

function EditProductForm(props) {
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

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // list of key-value pairs
        const formDataObj = Object.fromEntries(formData); // creates an object from a list of key-value pairs

        if(category === 'Select a category') {
            setCategoryErrorMessage("Choose a category!")
            return;
        }
        setCategoryErrorMessage("");
        
        props.handleEditForm({
            ...props.productToEdit,
            name: formDataObj.name,
            price: formDataObj.price,
            img: formDataObj.img.size === 0 ? props.productToEdit.img : formDataObj.img,
            category: category,
            rating: formDataObj.rating,
            desc: formDataObj.desc
        });
    }

    return (
        <div className='edit-prod'>
            <form className='form-container' onSubmit={handleEditFormSubmit}>
                <h2>EDIT PRODUCT</h2>
                <input required={true} type="text" defaultValue={props.productToEdit.name} name='name' placeholder='Enter name' />
                <input required={true} type="number" min="1" step="any"  defaultValue={props.productToEdit.price} name='price' placeholder='Enter price' />
                <input type="file" name="img" accept=".png, .jpg, .jpeg*"></input>
                <select onChange={handleCategoryChange} required > 
                    <option value="Select a category"> -- Select a category -- </option>
                    {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>  
                <p style={{color: "red"}}><b>{categoryErrorMessage}</b></p>   
                <input required={true} type="number" min="1" max="10" defaultValue={props.productToEdit.rating} name='rating' placeholder='Enter rating of product' />
                <textarea required={true} name='desc' defaultValue={props.productToEdit.desc} />
                <button type="submit" className='add-prod-btn'><b>EDIT PRODUCT</b></button>
            </form>    
        </div>
    );
}

export default EditProductForm;
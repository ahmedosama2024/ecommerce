import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Add = () => {
    const [select, setSelect] = useState('0');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [error, setError] = useState({});

    const validate = () => {
        const formError = {};

        if (!code) formError.code = "SKU is required";
        if (!name) formError.name = "Name is required";
        if (!price) formError.price = "Price is required";

        if (select === '1' && !size) formError.size = "Size is required for DVD";
        if (select === '2') {
            if (!length) formError.length = "Length is required for Furniture";
            if (!width) formError.width = "Width is required for Furniture";
            if (!height) formError.height = "Height is required for Furniture";
        }
        if (select === '3' && !weight) formError.weight = "Weight is required for Book";

        return formError;
    };

    const add = () => {
        const formError = validate();
        if (Object.keys(formError).length === 0) {
            axios.post("http://localhost/ecommers/Back-end/api.php/product/", {
                name, code, price, size, weight, length, width, height
            })
            .catch(err => console.log(err));

            // Reset fields
            setCode(''); setName(''); setPrice('');
            setSize(''); setWeight(''); setLength('');
            setWidth(''); setHeight(''); setSelect('0');
        } else {
            setError(formError);
        }
    };

    const handleChange = (setter) => (event) => setter(event.target.value);

    const cancel = () => {
        setCode(''); setName(''); setPrice('');
        setSize(''); setWeight(''); setLength('');
        setWidth(''); setHeight(''); setSelect('0');
    };

    return (
        <>
            <header className="d-flex justify-content-between m-2">
                <h1>Add Product</h1>
                <div className="btn">
                    <button className="p-2 btn-dark btn me-2"><Link to='/' className="text-light">Products</Link></button>
                    <button className="p-2 btn-dark btn text-light me-2" onClick={add}>Add</button>
                    <button className="p-2 btn-dark btn" onClick={cancel}>Cancel</button>
                </div>
            </header>
            <hr />
            <section>
                <div className="d-flex flex-column gap-3 p-4 addDiv">
                    <input type="text" name="code" onChange={handleChange(setCode)} placeholder="SKU" value={code} className="code" />
                    {error.code && <small className="text-danger">{error.code}</small>}
                    
                    <input type="text" name="name" onChange={handleChange(setName)} placeholder="Name" value={name} className="name" />
                    {error.name && <small className="text-danger">{error.name}</small>}
                    
                    <input type="text" name="price" onChange={handleChange(setPrice)} placeholder="Price" value={price} className="price" />
                    {error.price && <small className="text-danger">{error.price}</small>}
                    
                    <select value={select} onChange={handleChange(setSelect)}>
                        <option value="0">Open this select menu</option>
                        <option value="1">DVD</option>
                        <option value="2">Furniture</option>
                        <option value="3">Book</option>
                    </select>
                    
                    {select === '1' && (
                        <>
                            <input type="text" name="size" onChange={handleChange(setSize)} placeholder="Size (MB)" value={size} className="size" />
                            {error.size && <small className="text-danger">{error.size}</small>}
                        </>
                    )}
                    
                    {select === '2' && (
                        <>
                            <input type="text" name="length" onChange={handleChange(setLength)} placeholder="Length (CM)" value={length} className="length" />
                            {error.length && <small className="text-danger">{error.length}</small>}
                            
                            <input type="text" name="width" onChange={handleChange(setWidth)} placeholder="Width (CM)" value={width} className="width" />
                            {error.width && <small className="text-danger">{error.width}</small>}
                            
                            <input type="text" name="height" onChange={handleChange(setHeight)} placeholder="Height (CM)" value={height} className="height" />
                            {error.height && <small className="text-danger">{error.height}</small>}
                        </>
                    )}
                    
                    {select === '3' && (
                        <>
                            <input type="text" name="weight" onChange={handleChange(setWeight)} placeholder="Weight (KG)" value={weight} className="weight" />
                            {error.weight && <small className="text-danger">{error.weight}</small>}
                        </>
                    )}
                </div>
            </section>
            <hr />
            <p> &copy; 2024 Scandiweb. All rights reserved.</p>
        </>
    );
};

export default Add;

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import axios from 'axios';

const Home = () => {

    const [products,setProduct]=useState([]);


    useEffect(()=>{
        axios.get("http://localhost/ecommers/Back-end/api.php/product/")
        .then(response=>setProduct(response.data))
        .catch(error=>console.log(error))
    },[products])
    function RemoveProduct(id){

        axios.delete(`http://localhost/ecommers/Back-end/api.php/product/${id}`)
        .then(response=>setProduct(response.filter(response.id != id)))
        .catch(err=>console.log(err))

    }




  return (
    <> 
    <header className="d-flex justify-content-between m-2">
      <h1>Product List</h1>
      <div className="btn">
        <button className="btn btn-dark me-2">
          <Link to="/add" className="text-light">ADD</Link>
        </button>
        <button className="btn btn-dark text-light" onClick={()=>RemoveProduct(document.getElementById('productId').value)} >MASS DELETE</button>
      </div>
    </header>

    <hr/>

    <section className="product d-flex flex-wrap gap-5 justify-content-center ">

    {products.map((el) => (
      <div key={el.id}>
        <input type="radio" value={el.id} id="productId" />
        <p>Code: {el.code}</p>
        <p>Product: {el.name}</p>
        <p>Price: {el.price}</p>
        {el.size && <p className="size">Size: {el.size} Mb</p>}
        {el.length && <p className="volume">
          Volume: {el.length}X{el.width}X{el.height} Cm
        </p> }
        {el.weight &&  <p className="weight">Weight: {el.weight} Kg</p>}
        
      </div>
    ))}



    </section>
    <hr/>
    <p>&copy; 2024 Scandiweb. All rights reserved.</p>
    </>
  )
}

export default Home;

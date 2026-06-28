
import "./Store.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Store() {
  const navigate = useNavigate();
   const [products, setProducts] = useState([]);
useEffect(() => {
    fetch("https://my-business-backend-1z8e.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="store-container">

{products.map((product) => (

<div
  key={product._id}
  className="product-card"
>

  <img
    src={product.images?.[0]}
    alt={product.name}
  />

  <div className="product-info">

    <h2>{product.name}</h2>

    <div className="price">
      ₹{product.price}
    </div>

    <button
      className="view-btn"
      onClick={() =>
        navigate(`/product/${product._id}`)
      }
    >
      View Details
    </button>

  </div>

</div>

))}

</div>
  
  )
}
export default Store;

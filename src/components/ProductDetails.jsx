
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const [showOrder, setShowOrder] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
const placeOrder = async () => {
  const userId = localStorage.getItem("userId");
if (!userId) {
  alert("Please login first");
  navigate("/login");
  return;
}
  if (!address) {
    alert("Please enter address");
    return;
  }

  if (!paymentMethod) {
    alert("Please select payment method");
    return;
  }

  try {

    const response = await fetch(
      "https://my-business-backend-1z8e.onrender.com/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  userId: localStorage.getItem("userId"),
  productName: product.name,
  price: product.price,
  paymentMethod,
  address,
}),
      }
    );

    const data = await response.json();

    alert("Order Placed Successfully");

    setShowOrder(false);
    setAddress("");
    setPaymentMethod("");

  } catch (err) {
    console.log(err);
    alert("Order Failed");
  }
};
 useEffect(() => {
  fetch(`https://my-business-backend-1z8e.onrender.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);

    const images = Array.isArray(data.images)
  ? data.images
  : data.images
    ? [data.images]
    : [];

if (images.length > 0) {
  setSelectedImage(images[0]);
}
    });
}, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="product-details">

    <div className="product-card">
    {selectedImage &&(
      <img
  src={selectedImage}
  alt={product.name}
  className="main-image"
/>      
    )}
       <div className="gallery">

 {(Array.isArray(product.images)
  ? product.images
  : product.images
    ? [product.images]
    : []
)
  .filter((img) => img && img.trim() !== "")
  .map((img) => (

    <img
      key={img}
      src={img}
      alt=""
      className="thumb"

      onClick={() =>
        setSelectedImage(img)
      }
    />

  ))}

</div>
<div className="video-section">

  {product.videos?.map((video) => (

    <video
      key={video}
      controls
      width="300"
    >
      <source
        src={video}
        type="video/mp4"
      />
    </video>

  ))}

</div>

      <div className="product-info">

        <h1>{product.name}</h1>

        <div className="price">
          ₹{product.price}
        </div>

        <p className="info">
          {product.description}
        </p>

        <p className="info">
          Shape: {product.shape}
        </p>

        <p className="info">
          Height: {product.height}
        </p>

        {product.shape === "circle" && (
          <>
            <p className="info">
              Radius: {product.radius}
            </p>

            <p className="info">
              Diameter: {product.diameter}
            </p>
          </>
        )}

        {product.shape === "rectangle" && (
          <>
            <p className="info">
              Length: {product.length}
            </p>

            <p className="info">
              Breadth: {product.breadth}
            </p>
          </>
        )}

        <button
          className="order-btn"
          onClick={() => setShowOrder(true)}
        >
          Order Now
        </button>

        {showOrder && (

          <div className="order-box">

            <textarea
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option value="">
                Select Payment
              </option>

              <option value="COD">
                Cash On Delivery
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

            </select>

            <button
              className="confirm-btn"
              onClick={placeOrder}
            >
              Confirm Order
            </button>

            <button
              className="cancel-btn"
              onClick={() =>
                setShowOrder(false)
              }
            >
              Cancel
            </button>

          </div>

        )}

      </div>

    </div>

  </div>
);
}

export default ProductDetails;
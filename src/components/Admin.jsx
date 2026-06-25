import { useState } from "react";
import "./Admin.css"
import { Navigate, useNavigate } from "react-router-dom";

function Admin() {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [height, setHeight] = useState("");
const [images, setImages] = useState([]);
const [video, setVideo] = useState(null);
const [shape, setShape] = useState("");
const [loading, setLoading] = useState(false);
const [radius, setRadius] = useState("");
const [length, setLength] = useState("");
const [breadth, setBreadth] = useState("");

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://my-business-backend-1z8e.onrender.com/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const data = await response.json();
  return data.url;
};
const addProduct = async () => {
  if (loading) return;
  if (!name || !price || !description || !height) {
  alert("Please fill all required fields.");
  return;
}
  setLoading(true);

  try {

    const imageUrls = [];

    for (const image of images) {
      const url = await uploadFile(image);
      imageUrls.push(url);
    }

    let videoUrls = [];

    if (video) {
      const url = await uploadFile(video);
      videoUrls.push(url);
    }

    const product = {
      name,
      price: Number(price),
      description,
      height: Number(height),
      shape,
      radius: radius ? Number(radius) : null,
      diameter: radius ? Number(radius) * 2 : null,
      length: length ? Number(length) : null,
      breadth: breadth ? Number(breadth) : null,
      images: imageUrls,
      videos: videoUrls,
    };

    const response = await fetch(
      "https://my-business-backend-1z8e.onrender.com/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Product Added Successfully");

    setName("");
    setPrice("");
    setDescription("");
    setHeight("");
    setShape("");
    setRadius("");
    setLength("");
    setBreadth("");
    setImages([]);
    setVideo(null);

    setLoading(false);

  } catch (error) {
    console.log(error);
    alert("Error adding product");
  } finally {
    setLoading(false);
    
  }
};
  if (!isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  // your existing states here...

  return (
  <div className="admin-page">

    <div className="admin-header">

      <h1 className="admin-title">
        Admin Panel
      </h1>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/admin-login");
        }}
      >
        Logout
      </button>

    </div>

    <div className="admin-form">

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price in rupees"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="shape-buttons">

        <button
          className="shape-btn"
          onClick={() => setShape("circle")}
        >
          Circle
        </button>

        <button
          className="shape-btn"
          onClick={() => setShape("rectangle")}
        >
          Rectangle
        </button>

      </div>

      {shape === "circle" && (
        <>
          <input
            type="number"
            placeholder="Radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />

          <input
            type="number"
            placeholder="Diameter"
            value={radius ? Number(radius) * 2 : ""}
            readOnly
          />
        </>
      )}

      {shape === "rectangle" && (
        <>
          <input
            type="number"
            placeholder="Length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />

          <input
            type="number"
            placeholder="Breadth"
            value={breadth}
            onChange={(e) => setBreadth(e.target.value)}
          />
        </>
      )}

      <input
        type="number"
        placeholder="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <label>Upload Images</label>

<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) =>
    setImages([...e.target.files])
  }
/>

<label>Upload Video</label>

<input
  type="file"
  accept="video/*"
  onChange={(e) =>
    setVideo(e.target.files[0])
  }
/>
    

      <button
  className="add-btn"
  onClick={addProduct}
  disabled={loading}
>
  {loading ? "Uploading..." : "Add Product"}
</button>

    </div>

  </div>
);
}

export default Admin;
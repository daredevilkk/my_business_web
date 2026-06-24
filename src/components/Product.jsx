import { useParams } from "react-router-dom";
import products from "./Products";

function Product() {
  const { id } = useParams();

  const product = products.find(
    item => item.id == Number(id)
  );

  return (
    <>
    <button onClick={() => navigate(-1)}>
  Back
</button>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </>
  );
}

export default Product;
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
  <div style={{
  minWidth: "180px",
  maxWidth: "180px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px",
  textAlign: "center",
  background: "#fff"
}}>
      <img src={product.image} alt={product.name} width="100%" />

      <h4>{product.name}</h4>
      <p>${product.price}</p>

      <Link to={`/product/${product.id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}

export default ProductCard;
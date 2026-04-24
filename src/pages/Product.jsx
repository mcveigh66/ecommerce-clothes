import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, addToCart } from "../services/api";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        ...product,
        quantity: 1
      });
      alert("Added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-page">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px" }}
      />

      <h1>{product.name}</h1>
      <p><strong>Price:</strong> ${product.price}</p>
      
      <p><strong>Description:</strong> {product.description}</p>

      {product.stock !== undefined && (
        <p><strong>Stock:</strong> {product.stock}</p>
      )}

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
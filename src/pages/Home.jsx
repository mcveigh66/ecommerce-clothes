import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const categories = [
    "Outerwear",
    "Pants",
    "Shirts",
    "Sweaters",
    "Shoes"
  ];

  return (
    <div>
      <h1>Shop</h1>

      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>

          <div className="product-row">
            {products
              .filter(p => p.category === category)
              .map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
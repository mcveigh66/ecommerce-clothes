import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../services/api";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = async () => {
    try {
      
      await Promise.all(
        cartItems.map((item) => removeFromCart(item.id))
      );

      setCartItems([]);

      alert("Order confirmed! Thank you for your purchase.");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} width="80" />

                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Total: ${total.toFixed(2)}</h2>

          <button onClick={confirmOrder} className="checkout-btn">
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
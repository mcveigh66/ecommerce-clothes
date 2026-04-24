import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem
} from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await removeFromCart(id);
      loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (item, type) => {
    try {
      const currentQty = Number(item.quantity) || 1;

      const newQuantity =
        type === "inc"
          ? currentQty + 1
          : currentQty - 1;

      if (newQuantity <= 0) {
        await removeFromCart(item.id);
      } else {
        await updateCartItem(item.id, {
          ...item,
          quantity: newQuantity
        });
      }

      loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item, "dec")}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => updateQuantity(item, "inc")}>
                  +
                </button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>

          </div>
        ))
      )}

      <div className="cart-total">
        Total: ${total.toFixed(2)}
      </div>
      <Link to="/checkout">
      <button className="checkout-button">
      Go to Checkout
      </button>
      </Link>
    </div>
  );
}

export default Cart;
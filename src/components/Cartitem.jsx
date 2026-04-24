function CartItem({ item, onRemove }) {
  return (
    <div>
      <p>{item.name}</p>
      <p>${item.price}</p>

      <button onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
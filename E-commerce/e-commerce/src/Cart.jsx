export default function Cart({ cart, removeFromCart, updateCartQuantity }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <img
            src={item.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"}
            alt={item.name}
            style={{ marginRight: "10px", width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <div style={{ margin: "10px 0" }}>
              <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
              <span style={{ margin: "0 10px" }}>Quantity: {item.quantity || 1}</span>
              <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
            </div>
            <p>Subtotal: ₹{item.price * (item.quantity || 1)}</p>
            <button onClick={() => removeFromCart(item.id)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && <h3>Total: ₹{total}</h3>}
    </div>
  );
}
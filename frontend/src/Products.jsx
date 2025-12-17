const products = [
  { 
    id: 1, 
    name: "Mobile", 
    price: 15000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop"
  },
  { 
    id: 2, 
    name: "Laptop", 
    price: 45000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop"
  },
  { 
    id: 3, 
    name: "Headphones", 
    price: 2000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
  }
];

export default function Products({ addToCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Products</h1>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            width: "220px"
          }}
        >
          
          <img
            src={p.image}
            alt={p.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          <p><b>{p.name}</b></p>
          <p>₹ {p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
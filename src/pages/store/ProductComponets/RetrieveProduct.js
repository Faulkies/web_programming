import axios from "axios";

// choose the correct backend port (8080 OR 3001)
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
  },
});

// test call
api.get("/api/inft3050/BookGenre")
  .then(res => console.log(res.data))
  .catch(err => console.error("BookGenre error:", err));

// component example
import ItemCard from "../ItemComponets/ItemCard";
import { useState, useEffect } from "react";

const RetrieveProductById = () => {
  const [product, setProduct] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/api/inft3050/Product/4")
      .then(({ data }) => setProduct(data))
      .catch(e => setErr(e.message));
  }, []);

  if (err) return <p>Error: {err}</p>;
  if (!product) return <p>Loading…</p>;

  return (
    <ItemCard
      name={product.name}
      author={product.author}
      genre={product.genre}
      price={product.price}
      image={product.image}
    />
  );
};

export default RetrieveProductById;

import axios from "axios";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

const RetrieveProductById = () => {
  const [product, setProduct] = useState({});
  const id =5;
  

  useEffect(() => {
  async function load() {
    const [pRes, sRes] = await Promise.all([
      axios.get(`http://localhost:3001/api/inft3050/Product/${id}`),
      axios.get(`http://localhost:3001/api/inft3050/Stocktake/${id}`)
    ]);
    console.log(pRes);
    setProduct({ ...pRes.data, ...sRes.data });
  }
  load();
}, [id]);
  console.log(product);
  return (
    <ProductCard
      name={product.Name}
      author={product.Author}
      price={product.Price}
      
    />
  );
};

export default RetrieveProductById;

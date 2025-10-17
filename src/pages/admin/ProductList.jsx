import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import ProductCard from "../store/product_componets/ProductCard";

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.rows)) return data.rows;
  return data ? [data] : [];
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/inft3050/Product", {
        headers: { Accept: "application/json" }
      })
      .then((response) => {
        console.log("Raw response:", response.data);
        setProducts(toArray(response.data));
      })
      .catch((error) => {
        console.error("Products load failed:", error);
        setProducts([]); 
      });
  }, []);

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5" fontWeight="bold">
        Product Management
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={2}>
        {(products || []).map((p) => (
          <Stack key={p.ID ?? p.id ?? p.ProductID} spacing={1}>
            <ProductCard
              name={p.Name}
              author={p.Author}
              genre={p.Genre ?? p.genre}
            />
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined">Edit</Button>
              <Button size="small" color="error" variant="contained">Delete</Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ProductList;

import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import ProductCard from "../store/product_componets/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/inft3050/Product", {
      headers: { Accept: "application/json" }
    })
    .then((response) => {
      console.log(response.data);
      setProducts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5" fontWeight="bold">Product Management</Typography>
      
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {products.map((p) => (
          <Stack key={p.id} spacing={1}>
            <ProductCard
              name={p.Name}
              author={p.Author}
              genre={p.genre}
              
           
            />
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ProductList;

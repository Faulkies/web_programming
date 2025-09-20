import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "../../database/axios";
import ItemCard from "../store/ProductComponets/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/inft3050/Product")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5" fontWeight="bold">Product Management</Typography>
      
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {products.map((p) => (
          <Stack key={p.id} spacing={1}>
            <ItemCard
              name={p.name}
              author={p.author}
              genre={p.genre}
              price={p.price}
              image={p.image}
            />
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate(`/admin/edit-product/${p.id}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => console.log("TODO: delete product", p.id)}
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

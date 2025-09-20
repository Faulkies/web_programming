import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8080/api/inft3050/Product", form)
      .then(() => alert("Product added!"))
      .catch((err) => console.error(err));
  };

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5">Add New Product</Typography>

      <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
      <TextField label="Author" name="author" value={form.author} onChange={handleChange} />
      <TextField label="Genre" name="genre" value={form.genre} onChange={handleChange} />
      
      <Button variant="contained" onClick={handleSubmit}>Save</Button>
    </Stack>
  );
};

export default AddProduct;

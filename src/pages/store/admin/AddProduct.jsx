// Max
import { useState, useMemo } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import axios from "axios";
import { getSubGenreById } from "../../../Database/Helpers/getSubGenreById";
import { getSubGenreByName } from "../../../Database/Helpers/getSubGenreByName";
import { useEffect } from "react";
// Type -> Sub-genre options
const SUBGENRES = {
  1: {}, // Books
  2: {}, // Movies
  3: {}  // Games
};

const setSubGenres = (genre) => {
  if (genre === "Books"){
    getSubGenreByName("Books").then(data => {
      setSubGenres(prev => ({ ...prev, "1": data }));
    });
  }

}


const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    author: "",
    // product type: 1=Books, 2=Movies, 3=Games
    type: "1",
    // genre will now store the selected SUB-GENRE (e.g., "Fantasy")
    genre: "",
    description: "",
    price: "",
    image: ""
  });

  // Sub-genre options for the selected type
  
  const subGenreOptions = useMemo(() => SUBGENRES[form.type] ?? [], [form.type]);
  console.log("Running setSubGenres with 'Books'");
  setSubGenres("Books");
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If type changes, clear the sub-genre (genre) so the user picks again
    if (name === "type") {

      setForm(prev => ({ ...prev, type: value, genre: "" }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Send both type (for your backend if needed) and genre (sub-genre) as before
    axios.post("http://localhost:3001/api/inft3050/Product", form)
      .then(() => alert("Product added!"))
      .catch((err) => console.error(err));
  };

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5">Add New Product</Typography>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
        fullWidth
      />

      {/* Description (multiline) */}
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />

      {/* Step 1: Select Type (Books/Movies/Games) */}
      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup
          row
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="Books" />
          <FormControlLabel value="2" control={<Radio />} label="Movies" />
          <FormControlLabel value="3" control={<Radio />} label="Games" />
        </RadioGroup>
      </FormControl>

      {/* Step 2: Sub-Genre dropdown based on Type */}
      <FormControl fullWidth>
        <InputLabel id="sub-genre-label">Sub-Genre</InputLabel>
        <Select
          labelId="sub-genre-label"
          label="Sub-Genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
        >
          {/* {subGenreOptions.map((sg) => (
            <MenuItem key={sg} value={sg}>{sg}</MenuItem>
          ))} */}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit}>Save</Button>
    </Stack>
  );
};

export default AddProduct;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGenre } from "../../../Database/Helpers/getGenre";
import { adminLogin } from "../../../Database/apiClient";
import { api } from "../../../Database/apiClient";
import { getSubGenres } from "../../../Database/Helpers/getSubGenres";
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
  MenuItem,
  CircularProgress,
  Alert
} from "@mui/material";
import axios from "axios";

const EditProduct = () => {
  // Extract productId from URL parameters
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    author: "",
    type: "1",
    subGenre: "",
    description: "",
    published: "",
  });
  
  const [genreMap, setGenreMap] = useState({});
  const [subGenreMaps, setSubGenreMaps] = useState({ books: {}, movies: {}, games: {} });
  const { userName } = useSelector((state) => state.session);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Helper function - same as ProductsPage
  const getGenreFromProductId = (id) => {
    return genreMap[id] || "Unknown";
  };

  // Helper function - same as ProductsPage
  const getSubGenreFromProductId = (id, subGenreId) => {
    if (!subGenreId) return "";
    
    const genre = getGenreFromProductId(id);
    
    // Use the appropriate subgenre map based on genre
    if (genre === "Books") {
      return subGenreMaps.books[subGenreId] || "";
    } else if (genre === "Movies") {
      return subGenreMaps.movies[subGenreId] || "";
    } else if (genre === "Games") {
      return subGenreMaps.games[subGenreId] || "";
    }
    
    return "";
  };

  // Get available subgenres for dropdown based on selected type
  const getAvailableSubGenres = () => {
    let subGenreMap = {};
    
    switch (form.type) {
      case "1": // Books
        subGenreMap = subGenreMaps.books;
        break;
      case "2": // Movies
        subGenreMap = subGenreMaps.movies;
        break;
      case "3": // Games
        subGenreMap = subGenreMaps.games;
        break;
      default:
        subGenreMap = {};
    }
    
    // Convert object to array of options
    return Object.entries(subGenreMap).map(([id, name]) => ({
      id,
      name
    }));
  };

  // Fetch product data on component mount
  useEffect(() => {
    if (!productId) {
      setError("No product ID provided");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Fetch genres and build mapping - same as ProductsPage
        const genres = await getGenre();
        const mapping = {};
        
        genres.forEach(genre => {
          genre["Product List"]?.forEach(product => {
            mapping[product.ID] = genre.Name;
          });
        });
        
        setGenreMap(mapping);
        
        // Fetch subgenres - same as ProductsPage
        const subGenres = await getSubGenres();
        setSubGenreMaps(subGenres);
        
        // Fetch product data
        const response = await api.get(
          `/Product/${productId}`
        );
          
   
        
        const product = response.data;
        console.log("Fetched product:", product);
        
        // Determine genre type from mapping
        const productGenre = mapping[productId] || "Books";
        
        // Map genre name to type number
        let typeNumber = "1";
        switch (productGenre) {
          case "Books":
            typeNumber = "1";
            break;
          case "Movies":
            typeNumber = "2";
            break;
          case "Games":
            typeNumber = "3";
            break;
          default:
            typeNumber = "1";
        }
        
        // Set form with all data at once
        setForm({
          name: product.Name || "",
          author: product.Author || "",
          type: typeNumber,
          subGenre: product.SubGenre?.toString() || "",
          description: product.Description || "",
          published: product.Published ? product.Published.split('T')[0] : "",

        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If type changes, clear the sub-genre so the user picks again
    if (name === "type") {
      setForm(prev => ({ ...prev, type: value, subGenre: "" }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear success message when user starts editing
    if (success) setSuccess(false);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      // Prepare data with correct capitalized field names for API
      const updateData = {
        Name: form.name,
        Author: form.author,
        Description: form.description,
        SubGenre: form.subGenre ? parseInt(form.subGenre) : null,
        Published: form.published,
      };
      
      console.log("Updating product with data:", updateData);
      
      // Send PATCH request to update the product
      await adminLogin();
      
      await api.patch(
        `/Product/${productId}`,
        updateData,
        
        
      );
      
      setSuccess(true);
      alert("Product updated successfully!");
      navigate("/Admin/ProductsPage");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async () => {
    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete "${form.name}"? This will also delete all related stock records. This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    try {
      setError(null);
      setLoading(true);
      
      await adminLogin();
      
      // First, fetch and delete all related stocktake records
      try {
        const stocktakeResponse = await api.get(`/Stocktake?where=(ProductId,eq,${productId})`);
        const stocktakeRecords = Array.isArray(stocktakeResponse.data) 
          ? stocktakeResponse.data 
          : stocktakeResponse.data?.list || [];
        
        // Delete each stocktake record
        for (const record of stocktakeRecords) {
          await api.delete(`/Stocktake/${record.ItemId}`);
        }
      } catch (stockErr) {
        console.log("No stocktake records found or already deleted:", stockErr);
      }
      
      // Then delete the product
      await api.delete(`/Product/${productId}`);
      
      setLoading(false);
      alert("Product deleted successfully!");
      navigate("/Admin/ProductsPage"); // Navigate to products list
    } catch (err) {
      console.error("Error deleting product:", err);
      setLoading(false);
      
      // Show more detailed error message
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete product";
      setError(`Failed to delete product: ${errorMessage}. Please try again.`);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  // Get current sub-genre options based on selected type
  const availableSubGenres = getAvailableSubGenres();

  // Loading state
  if (loading) {
    return (
      <Stack spacing={2} p={4} alignItems="center">
        <CircularProgress />
        <Typography>Loading product data...</Typography>
      </Stack>
    );
  }

  // Error state
  if (error && !form.name) {
    return (
      <Stack spacing={2} p={4}>
        <Alert severity="error">{error}</Alert>
        <Button variant="outlined" onClick={handleCancel}>
          Go Back
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h5">Edit Product (ID: {productId})</Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Product updated successfully!</Alert>}

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        required
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

      <TextField
        label="Published"
        name="published"
        value={form.published}
        onChange={handleChange}
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
          name="subGenre"
          value={form.subGenre}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {availableSubGenres.map((sg) => (
            <MenuItem key={sg.id} value={sg.id}>{sg.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Update Product
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditProduct;
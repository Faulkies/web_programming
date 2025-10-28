import { useEffect, useState } from "react";
import BackButton from "../common/BackButton";
import { 
  Button, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Database/Helpers/productHelpers";
import { getGenre } from "../../../Database/Helpers/getGenre";
import { getSubGenres } from "../../../Database/Helpers/getSubGenres";

export default function ProductsPage() {
  const [data, setData] = useState({ list: [], pageInfo: null });
  const [genreMap, setGenreMap] = useState({});
  const [subGenreMaps, setSubGenreMaps] = useState({ books: {}, movies: {}, games: {} });
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSubGenre, setSelectedSubGenre] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Fetch genres and build mapping
      const genres = await getGenre();
      const mapping = {};
      
      genres.forEach(genre => {
        genre["Product List"]?.forEach(product => {
          mapping[product.ID] = genre.Name;
        });
      });
      
      setGenreMap(mapping);
      
      // Fetch subgenres
      const subGenres = await getSubGenres();
      setSubGenreMaps(subGenres);
      
      // Get products
      getProducts((productData) => {
        setData(productData);
        setLoading(false);
      });
    };
    
    loadData();
  }, []);

  const items = Object.values(data.list ?? {});

  const getGenreFromProductId = (id) => {
    return genreMap[id] || "Unknown";
  };

  const getSubGenreFromProduct = (product) => {
    if (!product.SubGenre) return "—";
    
    const genre = getGenreFromProductId(product.ID);
    
    // Use the appropriate subgenre map based on genre
    if (genre === "Books") {
      return subGenreMaps.books[product.SubGenre] || "—";
    } else if (genre === "Movies") {
      return subGenreMaps.movies[product.SubGenre] || "—";
    } else if (genre === "Games") {
      return subGenreMaps.games[product.SubGenre] || "—";
    }
    
    return "—";
  };

  // Get available subgenres based on selected genre
  const getAvailableSubGenres = () => {
    const subGenres = new Set();
    items.forEach(p => {
      const genre = getGenreFromProductId(p.ID);
      if (selectedGenre === "All" || genre === selectedGenre) {
        const subGenreName = getSubGenreFromProduct(p);
        if (subGenreName && subGenreName !== "—") {
          subGenres.add(subGenreName);
        }
      }
    });
    return Array.from(subGenres).sort();
  };

  // Filter items
  const filteredItems = items.filter(p => {
    const id = p.ID;
    const genre = getGenreFromProductId(id);
    const subGenre = getSubGenreFromProduct(p);

    if (searchId && !id.toString().includes(searchId)) {
      return false;
    }

    if (selectedGenre !== "All" && genre !== selectedGenre) {
      return false;
    }

    if (selectedSubGenre !== "All" && subGenre !== selectedSubGenre) {
      return false;
    }

    return true;
  });

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setSelectedSubGenre("All"); // Reset subgenre when genre changes
  };

  const handleClearFilters = () => {
    setSearchId("");
    setSelectedGenre("All");
    setSelectedSubGenre("All");
  };

  const availableSubGenres = getAvailableSubGenres();

  if (loading) {
    return (
      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography>Loading products...</Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <>
      <BackButton />
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <h2>Items</h2>
        <Button variant="contained" component={Link} to="/admin/AddNewProduct">Add Item</Button>
      </Stack>

      <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            label="Search by Product ID"
            variant="outlined"
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter ID..."
            sx={{ minWidth: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              label="Genre"
              onChange={handleGenreChange}
            >
              <MenuItem value="All">All Genres</MenuItem>
              <MenuItem value="Books">Books</MenuItem>
              <MenuItem value="Movies">Movies</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
            </Select>
          </FormControl>

          <FormControl 
            size="small" 
            sx={{ minWidth: 200 }} 
            disabled={selectedGenre === "All" || availableSubGenres.length === 0}
          >
            <InputLabel>Sub-Genre</InputLabel>
            <Select
              value={selectedSubGenre}
              label="Sub-Genre"
              onChange={(e) => setSelectedSubGenre(e.target.value)}
            >
              <MenuItem value="All">All Sub-Genres</MenuItem>
              {availableSubGenres.map(subGenre => (
                <MenuItem key={subGenre} value={subGenre}>{subGenre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="outlined" 
            onClick={handleClearFilters}
            sx={{ ml: 'auto' }}
          >
            Clear Filters
          </Button>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Showing {filteredItems.length} of {items.length} items
        </Typography>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Sub-Genre</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No items found matching your filters
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map((p) => {
              const genre = getGenreFromProductId(p.ID);
              const subGenre = getSubGenreFromProduct(p);
              return (
                <TableRow key={p.ID}>
                  <TableCell>{p.ID}</TableCell>
                  <TableCell>{p.Name ?? "—"}</TableCell>
                  <TableCell>{genre}</TableCell>
                  <TableCell>{subGenre}</TableCell>
                  <TableCell>{p.LastUpdatedBy ?? "—"}</TableCell>
                  <TableCell align="right">
                    <Button component={Link} to={`/admin/EditProduct/${p.ID}`}>Edit</Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Paper>
  </>
  );
}
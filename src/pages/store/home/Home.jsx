import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerLogin from "../auth/CustomerLogin";
import ProductCard from "../product_componets/ProductCard";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideBarFilter from "./SideBarFilter";
import CategoryChips from "./CategoryChips";
import { getProducts } from "../../../Database/Helpers/productHelpers";
import { getGenre } from "../../../Database/Helpers/getGenre";
import { getSubGenres } from "../../../Database/Helpers/getSubGenres";
import { CircularProgress, Typography } from "@mui/material";
import "../../../styles/styles.css"; 

const Home = () => {
  const isLoggedIn = true;

  const [filters, setFilters] = useState({
    genre: new Set(),
    subGenre: new Set(),
    format: new Set(),
    availability: new Set(),
    condition: new Set(["New", "Used"]),
    author: new Set(),
  });

  const [allProducts, setAllProducts] = useState({ list: [], pageInfo: null });
  const [genreMap, setGenreMap] = useState({}); // Map product ID to genre name
  const [subGenreMaps, setSubGenreMaps] = useState({ books: {}, movies: {}, games: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products, genres, and subgenres on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch genres and build mapping - same as ProductsPage
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
        
        // Fetch products using helper
        getProducts(setAllProducts);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function - same as ProductsPage
  const getGenreFromProductId = (id) => {
    return genreMap[id] || "Unknown";
  };

  // Helper function - same as ProductsPage
  const getSubGenreFromProduct = (product) => {
    if (!product.SubGenre) return "";
    
    const genre = getGenreFromProductId(product.ID);
    
    // Use the appropriate subgenre map based on genre
    if (genre === "Books") {
      return subGenreMaps.books[product.SubGenre] || "";
    } else if (genre === "Movies") {
      return subGenreMaps.movies[product.SubGenre] || "";
    } else if (genre === "Games") {
      return subGenreMaps.games[product.SubGenre] || "";
    }
    
    return "";
  };

  // Convert products list to array and filter
  const products = Object.values(allProducts.list || {});
  
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchTerm && !product.Name?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Genre filter
    if (filters.genre.size > 0) {
      const productGenre = getGenreFromProductId(product.ID);
      
      if (!filters.genre.has(productGenre)) {
        return false;
      }
    }

    // SubGenre filter
    if (filters.subGenre.size > 0) {
      const subGenreName = getSubGenreFromProduct(product);
      
      if (!subGenreName || !filters.subGenre.has(subGenreName)) {
        return false;
      }
    }

    // Author filter
    if (filters.author.size > 0 && !filters.author.has(product.Author)) {
      return false;
    }

    return true;
  });

  // Sort by published date descending
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.Published || 0);
    const dateB = new Date(b.Published || 0);
    return dateB - dateA;
  });

  if (!isLoggedIn) return <CustomerLogin />;

  return (
    <>
      <Header query={searchTerm} onQuery={setSearchTerm} />

      <main className="container">
        <div className="toolbar">
          <div className="badge">Free shipping over $79 • New arrivals weekly</div>
        </div>

        <div className="chips">
          <CategoryChips />
        </div>

        <div className="layout">
          <SideBarFilter className="sidebar" filters={filters} setFilters={setFilters} />
          
          <section>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <CircularProgress />
              </div>
            ) : error ? (
              <Typography color="error" align="center">{error}</Typography>
            ) : sortedProducts.length === 0 ? (
              <Typography align="center" sx={{ py: 4 }}>
                No products found. Try adjusting your filters.
              </Typography>
            ) : (
              <div className="grid">
                {sortedProducts.map(product => (
                  <Link 
                    key={product.ID} 
                    to={`/ProductPage/${product.ID}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Home;
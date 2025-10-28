// src/pages/ProductPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { api } from "../../../Database/apiClient";
import { useCart } from "../cart/CartProvider";
import Header from "../common/Header";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Divider,
  Button,
  Skeleton,
  Paper,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// helpers used in Home.jsx (to resolve labels)
import { getGenre } from "../../../Database/Helpers/getGenre";
import { getSubGenres } from "../../../Database/Helpers/getSubGenres";

export default function ProductPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stocktake rows (each = one Type/Source variant for this product)
  const [rows, setRows] = useState([]);

  // Basic product fields pulled from nested Product in Stocktake
  const [product, setProduct] = useState(null);

  // For the Type (Source) selector
  const [selectedSourceId, setSelectedSourceId] = useState(null);

  // Label maps (like Home.jsx)
  const [genreMap, setGenreMap] = useState({});
  const [subGenreMaps, setSubGenreMaps] = useState({ books: {}, movies: {}, games: {} });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");

      try {
        // 1) Fetch label maps (same logic as Home.jsx)
        const [genres, subGenres] = await Promise.all([getGenre(), getSubGenres()]);

        const gMap = {};
        genres.forEach(genre => {
          // Build ProductId -> GenreName mapping from the nested list
          genre["Product List"]?.forEach(p => {
            // API sometimes returns ID vs Id – support both
            const pid = p.ID ?? p.Id ?? p.id;
            if (pid != null) gMap[pid] = genre.Name;
          });
        });

        if (!cancelled) {
          setGenreMap(gMap);
          setSubGenreMaps(subGenres);
        }

        // 2) Fetch this product’s stocktake rows with nested Product and Source
        const url =
          `/Stocktake?where=(ProductId,eq,${id})` +
          `&nested[Product][fields]=Id,Name,Author,Image,Genre,SubGenre,Format,Description,Rating` +
          `&nested[Source][fields]=SourceId,SourceName`;

        const { data } = await api.get(url);
        const list = Array.isArray(data?.list) ? data.list : [];

        // Infer product fields from first row’s nested Product
        const p = list[0]?.Product || {};
        const normalizedProduct = {
          id: p.Id ?? p.ID ?? p.id ?? Number(id),
          name: p.Name ?? p.name ?? "Product",
          author: p.Author ?? p.author,
          img: p.Image ?? p.image,
          genreCode: p.Genre ?? p.genre,
          subGenreCode: p.SubGenre ?? p.subGenre,
          description: p.Description ?? p.description,
        };

        if (!cancelled) {
          setRows(list);
          setProduct(normalizedProduct);
          setSelectedSourceId(list[0]?.SourceId ?? list[0]?.Source?.SourceId ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError("Failed to load product.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => { cancelled = true; };
  }, [id]);

  // ----- label resolution helpers (mirror Home.jsx) -----
  const genreLabel = useMemo(() => {
    if (!product?.id) return "Unknown";
    return genreMap[product.id] || "Unknown";
  }, [product, genreMap]);

  const subGenreLabel = useMemo(() => {
    if (!product) return "";
    const code = product.subGenreCode;
    if (code == null) return "";
    const g = genreLabel;

    if (g === "Books")  return subGenreMaps.books[code]  || "";
    if (g === "Movies") return subGenreMaps.movies[code] || "";
    if (g === "Games")  return subGenreMaps.games[code]  || "";
    return "";
  }, [product, genreLabel, subGenreMaps]);

  // ----- build Type/Source drop-down from stocktake rows -----
  const sourceOptions = useMemo(() => {
    const seen = new Set();
    const opts = [];
    for (const r of rows) {
      const sid = r.SourceId ?? r.Source?.SourceId;
      if (!sid || seen.has(sid)) continue;
      seen.add(sid);
      opts.push({ id: sid, label: r.Source?.SourceName || `Source ${sid}` });
    }
    return opts;
  }, [rows]);

  // Selected stocktake row (drives price + stock)
  const selectedRow = useMemo(() => {
    return (
      rows.find(r => String(r.SourceId ?? r.Source?.SourceId) === String(selectedSourceId)) ||
      rows[0]
    );
  }, [rows, selectedSourceId]);

  const price = selectedRow?.Price;
  const quantity = selectedRow?.Quantity;

  const stockBadge = useMemo(() => {
    if (typeof quantity === "number") {
      if (quantity === 0) return <Chip color="error" label="Out of stock" />;
      if (quantity <= 5) return <Chip color="warning" label={`Only ${quantity} left`} />;
      return <Chip color="success" label="In stock" />;
    }
    return null;
  }, [quantity]);



  const cart = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (!selectedRow) return;
    const productId = product.id;
    const sourceId   = selectedRow.SourceId ?? selectedRow.Source?.SourceId;
    const sourceName = selectedRow.Source?.SourceName || `Source ${sourceId}`;
    const maxQty     = typeof selectedRow.Quantity === "number" ? selectedRow.Quantity : undefined;

    cart.addItem({
      productId,
      sourceId,
      sourceName,
      name: product.name,
      variantLabel: product.format || undefined, // optional
      price: Number(selectedRow.Price || 0),
      quantity: Math.max(1, Math.min(qty, maxQty ?? qty)),
      maxQty,
      image: product.img || null,
    });
    };

  return (
    <>
    <Header />

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        {loading && (
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Skeleton variant="rectangular" width={360} height={360} />
            <Box flex={1}>
              <Skeleton width="60%" height={42} />
              <Skeleton width="30%" />
              <Skeleton height={80} />
              <Skeleton width="40%" />
              <Skeleton width="25%" />
            </Box>
          </Stack>
        )}

        {!loading && error && (
          <Stack alignItems="center" spacing={2}>
            <Typography color="error">{error}</Typography>
            <Button component={RouterLink} to="/" variant="contained">Back to Store</Button>
          </Stack>
        )}

        {!loading && !error && product && (
          <Stack direction={{ xs: "column", md: "row" }} gap={4}>
            {/* Image */}
            <Box
              component="img"
              src={product.img || "https://via.placeholder.com/600x600?text=No+Image"}
              alt={product.name}
              sx={{
                width: { xs: "100%", md: 380 },
                height: { xs: 380, md: 420 },
                objectFit: "cover",
                borderRadius: 2,
                border: theme => `1px solid ${theme.palette.divider}`,
              }}
            />

            {/* Details */}
            <Stack flex={1} spacing={2}>
              <Typography variant="h4" fontWeight={700}>
                {product.name}
              </Typography>

              <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                {product.author && <Chip label={`By ${product.author}`} />}
                {genreLabel && <Chip label={genreLabel} />}
                {subGenreLabel && <Chip variant="outlined" label={subGenreLabel} />}
                {stockBadge}
              </Stack>

              <Divider />

              {product.description && (
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {product.description}
                </Typography>
              )}

              {/* Type / Source selector */}
              {sourceOptions.length > 0 && (
                <FormControl sx={{ mt: 1, maxWidth: 360 }}>
                  <InputLabel id="type-source-label">Type</InputLabel>
                  <Select
                    labelId="type-source-label"
                    label="Type"
                    value={selectedSourceId ?? ""}
                    onChange={(e) => setSelectedSourceId(e.target.value)}
                  >
                    {sourceOptions.map(opt => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Price & Stock tied to selected Source */}
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {typeof price !== "undefined" ? `$${Number(price).toFixed(2)}` : "Price on request"}
                </Typography>
                {typeof quantity === "number" && (
                  <Typography variant="body2" color="text.secondary">
                    Stock: {quantity}
                  </Typography>
                )}
              </Box>

              <Stack direction="row" gap={2}>
                <Button
                    size="large"
                    variant="contained"
                    disabled={!selectedRow || quantity === 0}
                    onClick={handleAdd}
                    >
                    Add to Cart
                </Button>

                <Button size="large" variant="outlined" component={RouterLink} to="/">
                  Continue Shopping
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Product ID: {product.id}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Paper>
    </>
  );
}

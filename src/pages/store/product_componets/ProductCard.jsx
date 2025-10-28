import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ProductCard = ({
  product,
  name,
  author,
  genre,
  subGenre,
  description,
  published,
}) => {
  const _name =
    name ??
    product?.name ??
    product?.Name ??
    "Untitled";
  const _author =
    author ??
    product?.author ??
    product?.Author ??
    "Unknown Author";
  const _genre =
    genre ??
    product?.genre ??
    product?.Genre ?? "Unknown";  
  const _subGenre =
    subGenre ??
    product?.subGenre ?? 
    product?.SubGenre ?? "";
  const _description =
    description ??
    product?.description ??
    product?.Description ??
    "";
  const _published =
    published ??
    product?.published ??
    product?.Published ??
    "";

  // Extract year from published date (e.g., "1946-01-01T00:00:00.000Z" -> "1946")
  const getYear = (dateString) => {
    if (!dateString) return "";
    try {
      const year = dateString.split('-')[0];
      return year;
    } catch {
      return "";
    }
  };

  const year = getYear(_published);

  // Truncate description to approximately 3-4 lines
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Card
      sx={{ 
        width: 280, 
        height: 280,
        borderRadius: 3, 
        boxShadow: 3, 
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Title */}
        <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          noWrap 
          title={_name}
          sx={{ mb: 0.5 }}
        >
          {_name}
        </Typography>

        {/* Author and Year */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            noWrap 
            title={_author}
            sx={{ flexGrow: 1 }}
          >
            {_author}
          </Typography>
          {year && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}
            >
              {year}
            </Typography>
          )}
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5,
          }}
        >
          {truncateText(_description)}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  genre: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subGenre: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  published: PropTypes.string,
};

export default ProductCard;
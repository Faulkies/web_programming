import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

const ProductCard = ({

  product,
  name,
  author,
  price,
  imageUrl,


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
    "Unknown";
  const _price =
    price ??
    product?.price ??
    product?.Price ??
    0;
  const _image =
    imageUrl ??
    product?.imageUrl ??
    product?.ImageUrl ??
    null;

  return (
    <Card
      sx={{ width: 240, borderRadius: 3, boxShadow: 3, overflow: "hidden" }}
    >
      

      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" noWrap title={_name}>
          {_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap title={_author}>
          {_author}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {currency.format(Number(_price) || 0)}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageUrl: PropTypes.string,
};

export default ProductCard; 
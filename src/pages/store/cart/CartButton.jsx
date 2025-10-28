import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const cart = useCart();
  return (
    <IconButton onClick={cart.openCart}>
      <Badge badgeContent={cart.count} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
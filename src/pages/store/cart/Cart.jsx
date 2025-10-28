
import {
  Drawer, Box, Stack, Typography, IconButton, Divider, Button, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const cart = useCart();
  const nav = useNavigate();
  return (
    <Drawer anchor="right" open={cart.open} onClose={cart.closeCart}>
      <Box sx={{ width: 380, p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={cart.closeCart}><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />

        {cart.items.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty.</Typography>
        ) : (
          <Stack spacing={2}>
            {cart.items.map(i => (
              <Box key={i.key} sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1, p: 1.5 }}>
                <Typography fontWeight={600}>{i.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {i.sourceName} • {i.variantLabel || ""}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <TextField
                    size="small"
                    type="number"
                    inputProps={{ min: 1, max: i.maxQty ?? undefined }}
                    value={i.quantity}
                    onChange={(e) => cart.updateItem(i.productId, i.sourceId, Number(e.target.value), i.maxQty)}
                    sx={{ width: 90 }}
                  />
                  <Typography sx={{ ml: "auto" }}>${(Number(i.price) * i.quantity).toFixed(2)}</Typography>
                  <IconButton onClick={() => cart.removeItem(i.productId, i.sourceId)}><DeleteOutlineIcon /></IconButton>
                </Stack>
              </Box>
            ))}

            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography fontWeight={700}>${cart.subtotal.toFixed(2)}</Typography>
            </Stack>
            <Button variant="contained" size="large" fullWidth onClick={() => { cart.closeCart(); nav("/Checkout"); }}>
              Checkout
            </Button>
            <Button variant="text" fullWidth onClick={cart.clear}>
              Clear Cart
            </Button>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}

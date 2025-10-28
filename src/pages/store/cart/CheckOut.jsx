import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Paper, Stack, Typography, TextField, Divider, Button, RadioGroup,
  FormControlLabel, Radio, Checkbox, CircularProgress, Alert
} from "@mui/material";
import { useCart } from "../cart/CartProvider";
import { adminLogin, api } from "../../../Database/apiClient"; // adjust path if needed
import validator from "validator";
// Basic helpers
const currency = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();

  const [shipMethod, setShipMethod] = useState("standard"); // "standard" | "express" | "pickup"
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", postcode: "", country: "Australia",
  });

  const [billing, setBilling] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", postcode: "", country: "Australia",
  });

  // Shipping price rules (free std over $79)
  const shippingFee = useMemo(() => {
    if (shipMethod === "pickup") return 0;
    if (shipMethod === "express") return 19.95;
    // standard
    return cart.subtotal >= 79 ? 0 : 9.95;
  }, [shipMethod, cart.subtotal]);

  const total = useMemo(() => cart.subtotal + shippingFee, [cart.subtotal, shippingFee]);

  const onChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Minimal front-end validation
  const validate = () => {
    const s = shipping;
    if (!s.firstName || !s.lastName) return "Please enter your name.";
    if (!validator.isEmail(s.email)) return "Invalid email address.";
    if (!s.address1 && shipMethod !== "pickup") return "Enter a shipping address.";
    if (!s.city && shipMethod !== "pickup") return "Enter your city/suburb.";
    if (!s.postcode && shipMethod !== "pickup") return "Enter your postcode.";
    if (cart.items.length === 0) return "Your cart is empty.";
    return "";
  };

  // Re-validate stock from API (defensive)
  const checkStock = async () => {
    for (const i of cart.items) {
      const where = encodeURIComponent(`(ProductId,eq,${i.productId})`);
      // Retreive the exact row for the selected SourceId
      const url =
        `/Stocktake?where=${where}&nested[Source][fields]=SourceId,SourceName`;
      const { data } = await api.get(url, { headers: { Accept: "application/json" } });
      const list = Array.isArray(data?.list) ? data.list : [];
      const row = list.find(r => String(r.SourceId ?? r.Source?.SourceId) === String(i.sourceId));
      const q = row?.Quantity ?? 0;
      if (q < i.quantity) {
        throw new Error(`Not enough stock for ${i.name} (${i.sourceName}). Available: ${q}`);
      }
    }
  };

  const handlePlaceOrder = async () => {
    setErr("");
    const v = validate();
    if (v) { setErr(v); return; }

    setLoading(true);
    try {
      await checkStock();

      const billingPayload = sameAsShipping ? { ...shipping } : { ...billing };

      // Construct order payload (adjust to your API contract)
      const order = {
        customer: {
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          email: shipping.email,
          phone: shipping.phone,
        },
        shipping: shipMethod === "pickup" ? { method: "Pickup" } : { ...shipping, method: shipMethod },
        billing: { ...billingPayload },
        items: cart.items.map(i => ({
          productId: i.productId,
          sourceId: i.sourceId, // variant/type
          name: i.name,
          sourceName: i.sourceName,
          quantity: i.quantity,
          unitPrice: Number(i.price),
          lineTotal: Number(i.price) * i.quantity,
        })),
        charges: {
          shipping: shippingFee,
          subtotal: cart.subtotal,
          total,
        },
        payment: {
          method: "MockCard", // or "PayOnPickup"
          status: "Authorized", // simulate; replace when integrating a gateway
        },
      };

   
      await adminLogin(); 
      const { data } = await api.post("/Orders", order, { headers: { "Content-Type": "application/json" } });
      const newOrderId = data?.orderId ?? data?.id ?? "unknown";

      cart.clear();
      navigate(`/order-confirmation/${encodeURIComponent(newOrderId)}`, { replace: true });
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Checkout
      </Typography>
      <Stack direction={{ xs: "column", lg: "row" }} gap={3}>
        {/* Left: forms */}
        <Stack flex={1} gap={2}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Shipping</Typography>

            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField label="First name" name="firstName" value={shipping.firstName} onChange={onChange(setShipping)} fullWidth />
              <TextField label="Last name" name="lastName" value={shipping.lastName} onChange={onChange(setShipping)} fullWidth />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
              <TextField label="Email" name="email" value={shipping.email} onChange={onChange(setShipping)} fullWidth />
              <TextField label="Phone" name="phone" value={shipping.phone} onChange={onChange(setShipping)} fullWidth />
            </Stack>

            {shipMethod !== "pickup" && (
              <>
                <TextField sx={{ mt: 2 }} label="Address line 1" name="address1" value={shipping.address1} onChange={onChange(setShipping)} fullWidth />
                <TextField sx={{ mt: 2 }} label="Address line 2 (optional)" name="address2" value={shipping.address2} onChange={onChange(setShipping)} fullWidth />
                <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
                  <TextField label="City/Suburb" name="city" value={shipping.city} onChange={onChange(setShipping)} fullWidth />
                  <TextField label="State" name="state" value={shipping.state} onChange={onChange(setShipping)} fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
                  <TextField label="Postcode" name="postcode" value={shipping.postcode} onChange={onChange(setShipping)} fullWidth />
                  <TextField label="Country" name="country" value={shipping.country} onChange={onChange(setShipping)} fullWidth />
                </Stack>
              </>
            )}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Shipping method</Typography>
            <RadioGroup
              value={shipMethod}
              onChange={(e) => setShipMethod(e.target.value)}
            >
              <FormControlLabel value="standard" control={<Radio />} label={`Standard ${cart.subtotal >= 79 ? "(Free)" : currency(9.95)}`} />
              <FormControlLabel value="express" control={<Radio />} label={<>Express {currency(19.95)}</>} />
              <FormControlLabel value="pickup" control={<Radio />} label="Free Pickup" />
            </RadioGroup>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Billing</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                  />
                }
                label="Same as shipping"
              />
            </Stack>

            {!sameAsShipping && (
              <>
                <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                  <TextField label="First name" name="firstName" value={billing.firstName} onChange={onChange(setBilling)} fullWidth />
                  <TextField label="Last name" name="lastName" value={billing.lastName} onChange={onChange(setBilling)} fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
                  <TextField label="Email" name="email" value={billing.email} onChange={onChange(setBilling)} fullWidth />
                  <TextField label="Phone" name="phone" value={billing.phone} onChange={onChange(setBilling)} fullWidth />
                </Stack>
                <TextField sx={{ mt: 2 }} label="Address line 1" name="address1" value={billing.address1} onChange={onChange(setBilling)} fullWidth />
                <TextField sx={{ mt: 2 }} label="Address line 2 (optional)" name="address2" value={billing.address2} onChange={onChange(setBilling)} fullWidth />
                <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
                  <TextField label="City/Suburb" name="city" value={billing.city} onChange={onChange(setBilling)} fullWidth />
                  <TextField label="State" name="state" value={billing.state} onChange={onChange(setBilling)} fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 2 }}>
                  <TextField label="Postcode" name="postcode" value={billing.postcode} onChange={onChange(setBilling)} fullWidth />
                  <TextField label="Country" name="country" value={billing.country} onChange={onChange(setBilling)} fullWidth />
                </Stack>
              </>
            )}
          </Paper>

          {err && <Alert severity="error">{err}</Alert>}
          <Button
            variant="contained"
            size="large"
            onClick={handlePlaceOrder}
            disabled={loading || cart.items.length === 0}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Placing order..." : `Place Order (${currency(total)})`}
          </Button>
        </Stack>

        {/* Right: order summary */}
        <Paper variant="outlined" sx={{ p: 2, width: { lg: 420 } }}>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1.5}>
            {cart.items.length === 0 ? (
              <Typography color="text.secondary">No items.</Typography>
            ) : cart.items.map(i => (
              <Stack key={i.key} direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={i.image || "https://via.placeholder.com/60?text=IMG"}
                  alt={i.name}
                  sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600} noWrap>{i.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Type: {i.sourceName}{i.variantLabel ? ` • ${i.variantLabel}` : ""}
                  </Typography>
                  <Typography variant="body2">Qty: {i.quantity}</Typography>
                </Box>
                <Typography>{currency(Number(i.price) * i.quantity)}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography>Subtotal</Typography>
            <Typography>{currency(cart.subtotal)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Shipping</Typography>
            <Typography>{currency(shippingFee)}</Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{currency(total)}</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

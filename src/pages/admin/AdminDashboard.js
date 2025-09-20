import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3} p={4}>
      <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => navigate("/admin/products")}>
          Manage Products
        </Button>
        <Button variant="outlined" onClick={() => navigate("/admin/add-product")}>
          Add Product
        </Button>
      </Stack>
    </Stack>
  );
};

export default AdminDashboard;

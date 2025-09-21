import { Button, Stack, Typography } from "@mui/material";
import { Link} from "react-router-dom";


const AdminDashboard = () => {

  return (
        <Stack spacing={3} p={4}>
        <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>

        <Stack direction="row" spacing={2}>  

            <Link to="/Admin/ProductList">
                <Button variant="contained"  >
                    Manage Products
                </Button> 
            </Link>
          
            <Link to="/Admin/AddProduct">
                <Button variant="outlined"  >
                    Add Product
                </Button>
            </Link>

             
        </Stack>
        </Stack>
  );
};

export default AdminDashboard;

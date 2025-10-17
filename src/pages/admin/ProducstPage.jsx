// src/admin/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductsPage(){
  const [rows, setRows] = useState([]);
  useEffect(()=>{ axios.get("/admin/products").then(r=>setRows(r.data)); },[]);
  return (
    <Paper sx={{ p:2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb:2 }}>
        <h2>Items</h2>
        <Button variant="contained" component={Link} to="/admin/products/new">Add Item</Button>
      </Stack>
      <Table>
        <TableHead><TableRow>
          <TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>Genre</TableCell><TableCell>Updated By</TableCell><TableCell/>
        </TableRow></TableHead>
        <TableBody>
          {rows.map(r=>(
            <TableRow key={r.ID}>
              <TableCell>{r.ID}</TableCell>
              <TableCell>{r.Name}</TableCell>
              <TableCell>{r.GenreName}</TableCell>
              <TableCell>{r.LastUpdatedBy}</TableCell>
              <TableCell align="right">
                <Button component={Link} to={`/admin/products/${r.ID}`}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

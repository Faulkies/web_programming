import { useEffect, useState } from "react";
import { Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { getProducts } from "../../../Database/Helpers/productHelpers";
import { getSubGenreById } from "../../../Database/Helpers/getSubGenreById";

export default function ProductsPage() {
  const [data, setData] = useState({ list: [], pageInfo: null });

  useEffect(() => {

    getProducts(setData);
  }, []); 
  const items = Object.values(data.list ?? {});
  const getGenreFromProductId = (id) => {
  if (id >= 1   && id <= 199) return "Books";
  if (id >= 200 && id <= 299) return "Movies";
  if (id >= 300 && id <= 399) return "Games";
  return "Unknown";
};
  return (
    <Paper sx={{ p:2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb:2 }}>
        <h2>Items</h2>
        <Button variant="contained" component={Link} to="/admin/AddNewProduct">Add Item</Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Sub-Genre</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((p, i) => {
            const id = p.ID ?? i;
            const genre = getGenreFromProductId(id);
            return (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{p.Name ?? "—"}</TableCell>
                <TableCell>{genre}</TableCell>
                <TableCell>{getSubGenreById(id, p.SubGenreId)}</TableCell>
                <TableCell>{p.LastUpdatedBy ?? "—"}</TableCell>
                <TableCell align="right">
                  <Button component={Link} to={`/admin/products/${id}`}>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

    </Paper>
  );
}

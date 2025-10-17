//Kien
import React from "react";
import { Chip, Stack } from "@mui/material";

const CATS = ["All", "Fiction", "Non-Fiction", "Mystery", "Sci-Fi"];

export default function CategoryChips({ active, onChange }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {CATS.map((c) => (
        <Chip
          key={c}
          label={c}
          clickable
          color={active === c ? "primary" : "default"}
          variant={active === c ? "filled" : "outlined"}
          onClick={() => onChange(c)}
        />
      ))}
    </Stack>
  );
}
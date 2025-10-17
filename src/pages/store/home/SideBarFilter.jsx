//Kien
import React from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  FormControlLabel, Checkbox, Stack, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GENRES = ['Fiction','Non-fiction','Mystery','Science Fiction'];
const FORMATS = ['Paperback','Hardcover','eBook'];
const AVAIL = ['In Stock','Preorder'];
const COND = ['New','Used'];
const AUTHORS = ['Various'];

export default function SideBarFilter({ filters, setFilters }) {
  const toggle = (group, value) => {
    setFilters(prev => {
      const copy = new Set(prev[group]);
      copy.has(value) ? copy.delete(value) : copy.add(value);
      return { ...prev, [group]: copy };
    });
  };

  const clearAll = () =>
    setFilters({
      genre: new Set(),
      format: new Set(),
      availability: new Set(),
      condition: new Set(),
      author: new Set(),
    });

  const Section = ({ label, group, values }) => (
    <Accordion defaultExpanded disableGutters square={false} sx={{ bgcolor: 'transparent' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${group}-content`} id={`${group}-header`}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {values.map(v => (
            <FormControlLabel
              key={v}
              label={v}
              labelPlacement="start"
              control={
                <Checkbox
                  checked={filters[group].has(v)}
                  onChange={() => toggle(group, v)}
                  size="small"
                />
              }
              sx={{
                m: 0,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                justifyContent: 'space-between',
                width: '100%',
                
              }}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box
      component="aside"
      aria-label="Filters"
      sx={{
        position: 'sticky',
        top: 84,
        alignSelf: 'start',
        minWidth: 260,
        maxWidth: 320,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" gutterBottom>Filter</Typography>

      <Section label="Genre" group="genre" values={GENRES} />
      <Section label="Format" group="format" values={FORMATS} />
      <Section label="Availability" group="availability" values={AVAIL} />
      <Section label="Condition" group="condition" values={COND} />
      <Section label="Author" group="author" values={AUTHORS} />

      <Button
        variant="outlined"
        fullWidth
        onClick={clearAll}
        sx={{ mt: 1.5, borderRadius: 2 }}
      >
        Clear all
      </Button>
    </Box>
  );
}

//Kien
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  FormControlLabel, Checkbox, Stack, Button, CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getGenre } from '../../../Database/Helpers/getGenre';
import { getSubGenres } from '../../../Database/Helpers/getSubGenres';


export default function SideBarFilter({ filters, setFilters }) {
  const [genres, setGenres] = useState([]);
  const [subGenres, setSubGenres] = useState({ books: {}, movies: {}, games: {} });
  const [loading, setLoading] = useState(true);

  // Convert subgenre maps to arrays for display based on selected genres
  const getFilteredSubGenres = () => {
    if (filters.genre.size === 0) {
      return []; // No genres selected, return empty
    }

    const subGenreList = [];
    
    // Add subgenres based on selected genres
    if (filters.genre.has('Books')) {
      subGenreList.push(...Object.values(subGenres.books || {}));
    }
    if (filters.genre.has('Movies')) {
      subGenreList.push(...Object.values(subGenres.movies || {}));
    }
    if (filters.genre.has('Games')) {
      subGenreList.push(...Object.values(subGenres.games || {}));
    }
    
    // Remove duplicates (in case same name appears in multiple genres)
    return [...new Set(subGenreList)];
  };

  // Load genres and subgenres on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch genres
        const genreData = await getGenre();
        // Extract unique genre names (Books, Movies, Games)
        const genreNames = genreData.map(g => g.Name);
        setGenres(genreNames);
        
        // Fetch all subgenres
        const subGenreData = await getSubGenres();
        setSubGenres(subGenreData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading filter data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Clear subGenre filters when genres change (if selected subgenres are no longer valid)
  useEffect(() => {
    if (filters.subGenre.size > 0 && filters.genre.size > 0) {
      const validSubGenres = getFilteredSubGenres();
      const currentSubGenres = Array.from(filters.subGenre);
      
      // Check if any selected subgenres are no longer in the filtered list
      const invalidSubGenres = currentSubGenres.filter(sg => !validSubGenres.includes(sg));
      
      if (invalidSubGenres.length > 0) {
        // Remove invalid subgenres
        setFilters(prev => {
          const newSubGenres = new Set(prev.subGenre);
          invalidSubGenres.forEach(sg => newSubGenres.delete(sg));
          return { ...prev, subGenre: newSubGenres };
        });
      }
    } else if (filters.genre.size === 0 && filters.subGenre.size > 0) {
      // If no genres selected, clear all subgenres
      setFilters(prev => ({
        ...prev,
        subGenre: new Set()
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.genre]); // Run when genre filter changes

  const filteredSubGenres = getFilteredSubGenres();

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
      subGenre: new Set(),
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
          {values.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 1 }}>
              {group === 'subGenre' ? 'Select a genre first' : 'No options available'}
            </Typography>
          ) : (
            values.map(v => (
              <FormControlLabel
                key={v}
                label={v}
                labelPlacement="start"
                control={
                  <Checkbox
                    checked={filters[group]?.has(v) || false}
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
            ))
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  if (loading) {
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

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

      <Section label="Genre" group="genre" values={genres} />
      <Section label="Sub-Genre" group="subGenre" values={filteredSubGenres} />


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
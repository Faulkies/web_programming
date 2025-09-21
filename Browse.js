import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

//testing code for if the books display properly before data is inserted from database
const books = [
  { id: 1, title: 'Book One', author: 'Author A', year: 2020 },
  { id: 2, title: 'Book Two', author: 'Author B', year: 2019 },
  { id: 3, title: 'Book Three', author: 'Author C', year: 2021 },
  { id: 4, title: 'Book Four', author: 'Author D', year: 2018 },
  { id: 5, title: 'Book Five', author: 'Author E', year: 2022 },
];

const BookBrowser = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center"> //gutterBottoms sets text in correct spot
        Browse Books
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{ height: '100%' }}> //card allows for dislay of books as a deck of cards and might allow image displaying
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.Name} //grtabs name of book from database
                </Typography>
                <Typography>
                  by {book.Author} //grabs name of author that published book
                </Typography>
                <Typography>
                  Published: {book.Published} //grabs year books was published
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookBrowser;

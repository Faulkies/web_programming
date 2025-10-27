import React, { useEffect, useState } from "react";
import axios from "axios";

function BookGenreList() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this URL if your backend uses a different port or path
    const apiUrl = "http://localhost:3001/api/inft3050/BookGenre";

    // Set up headers including authentication token
    const headers = {
      Accept: "application/json",
      "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // from your lab instructions
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        console.log("Data received:", response.data);
        setGenres(response.data.list || response.data); // sometimes nocodb wraps data in .list
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch genres. Check Docker or token.");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Book Genres</h2>
      {genres.length === 0 ? (
        <p>Loading genres...</p>
      ) : (
        <ul>
          {genres.map((genre) => (
            <li key={genre.id || genre.ID}>{genre.GenreName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookGenreList;

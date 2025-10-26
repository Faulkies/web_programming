import { api } from '../apiClient';

let subGenreCache = null;

export async function getSubGenres(useCache = true) {
    if (useCache && subGenreCache) {
        console.log("Returning cached subgenres");
        return subGenreCache;
    }

    try {
        // Fetch all subgenre types in parallel
        const [bookGenres, movieGenres, gameGenres] = await Promise.all([
            api.get("/BookGenre?limit=1000"),
            api.get("/MovieGenre?limit=1000"),
            api.get("/GameGenre?limit=1000")
        ]);

        // Create separate maps for each type
        const bookSubGenreMap = {};
        const movieSubGenreMap = {};
        const gameSubGenreMap = {};
        
        bookGenres.data.list?.forEach(sg => {
            bookSubGenreMap[sg.SubGenreID] = sg.Name;
        });
        
        movieGenres.data.list?.forEach(sg => {
            movieSubGenreMap[sg.SubGenreID] = sg.Name;
        });
        
        gameGenres.data.list?.forEach(sg => {
            gameSubGenreMap[sg.SubGenreID] = sg.Name;
        });

        subGenreCache = {
            books: bookSubGenreMap,
            movies: movieSubGenreMap,
            games: gameSubGenreMap
        };
        
        console.log("Loaded subgenres:", subGenreCache);
        return subGenreCache;
    } catch (error) {
        console.error("Error fetching subgenres:", error);
        return {
            books: {},
            movies: {},
            games: {}
        };
    }
}

export function clearSubGenreCache() {
    subGenreCache = null;
}
import axios from 'axios';
import { getGenreById } from './GetGenreById';
import { getSubGenreByName } from './getSubGenreByName';

const API_PREFIX = "/api/inft3050";

// ❌ ISSUE: These are not awaited, so they're Promises, not data
// ❌ ISSUE: Module-level initialization might not complete before use

// ✅ SOLUTION: Make the function fetch data when called
const getSubGenreById = async (id) => {
    try {
        // Fetch all genre data when needed
        const bookGenre = await getSubGenreByName("Books");
        const movieGenre = await getSubGenreByName("Movies");
        const gameGenre = await getSubGenreByName("Games");
        
        console.log("bookGenre:", bookGenre);
        console.log("movieGenre:", movieGenre);
        console.log("gameGenre:", gameGenre);
        
        // Check which genre contains this ID
        if (bookGenre && id in bookGenre) {
            return bookGenre[id];
        } else if (movieGenre && id in movieGenre) {
            return movieGenre[id];
        } else if (gameGenre && id in gameGenre) {
            return gameGenre[id];
        } else {
            return "Unknown";
        }
    } catch (error) {
        console.error("Error in getSubGenreById:", error);
        return "Unknown";
    }
};

export { getSubGenreById };
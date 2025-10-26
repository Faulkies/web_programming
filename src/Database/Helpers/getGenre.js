import { api } from '../apiClient';

let genreCache = null;

export async function getGenre(useCache = true) {
    if (useCache && genreCache) {
        console.log("Returning cached genres");
        return genreCache;
    }

    try {
        // Fetch with large nested limit to get all products
        const response = await api.get("/Genre", {
            params: {
                'nested[Product List][limit]': 1000,
                'nested[Source List][limit]': 100
            }
        });
        
        console.log("response data:", response.data);
        genreCache = response.data.list;
        return genreCache;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
}

export function clearGenreCache() {
    genreCache = null;
}
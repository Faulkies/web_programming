import { api } from "../apiClient";

// Cache for product -> genre mapping
let productGenreMap = null;
let genreDetails = { 1: "Books", 2: "Movies", 3: "Games" };

async function loadProductGenreMap() {
    if (!productGenreMap) {
        const response = await api.get('/Product', {
            params: {
                'fields': 'ID,Genre',
                'limit': 1000
            }
        });
        
        productGenreMap = {};
        response.data.list.forEach(product => {
            productGenreMap[product.ID] = product.Genre;
        });
    }
    return productGenreMap;
}

export async function getGenreById(productId) {
    const map = await loadProductGenreMap(); // Only fetches once
    const genreId = map[productId];
    
    if (genreId) {
        return {
            genreId: genreId,
            genreName: genreDetails[genreId] || "Unknown"
        };
    }
    
    return null;
}

export function clearCache() {
    productGenreMap = null;
}
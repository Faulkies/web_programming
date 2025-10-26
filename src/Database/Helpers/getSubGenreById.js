import axios from 'axios';
import { getGenreById } from './GetGenreById';
import { getSubGenreByName } from './getSubGenreByName';



const API_PREFIX = "/api/inft3050";

let bookGenre = {};
let movieGenre = {};  
let gameGenre = {};

bookGenre = getSubGenreByName("Books");
movieGenre = getSubGenreByName("Movies");
gameGenre = getSubGenreByName("Games");

console.log("bookGenre:", bookGenre);
console.log("movieGenre:", movieGenre);
console.log("gameGenre:", gameGenre);


getGenreById(1);


// Async version - returns a Promise
const getSubGenreById = async (id) => {
    if (id in bookGenre) {
        return bookGenre[id];
    } else if (id in movieGenre) {  
        return movieGenre[id];
    } else if (id in gameGenre) {
        return gameGenre[id];
    } else {
        return "Unknown";
    }
};

export { getSubGenreById };
import axios from 'axios';
//API endpoints
const API_PREFIX = "/api/inft3050";

const getSubGenreById = (id, subGenreId) => {
    const headers = {
        'Accept': 'application/json',
    };

    if (id <= 199) {
        axios.get(API_PREFIX + "/BookGenre/" + subGenreId,{
            headers: headers,
            }).then((response) => { //Suc
                return(response.data);
            }).catch((error) => {
                return(error);
            });
        } 
    else if (id >= 200 && id <= 299) {
        axios.get(API_PREFIX + "/MovieGenre/" + subGenreId,{
            headers: headers,
            }).then((response) => { //Success
                console.log(response.data.Name);
                return(response.data.Name);
            }).catch((error) => {
                return(error);
            });
        }
    else if (id >= 300 && id <= 399) {
        axios.get(API_PREFIX + "/GameGenre/" + subGenreId,{
            headers: headers,
            }).then((response) => { //Success
                console.log(response.data.Name);
                return(response.data.Name);
            }).catch((error) => {
                return(error);
            });
        }
}
export { getSubGenreById };
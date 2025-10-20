import axios from 'axios';

const API_PREFIX = "/api/inft3050";
const getProducts = (setProducts) => {
    const headers = {
        'Accept': 'application/json',
    };

    axios.get(API_PREFIX + "/Product", {
        headers: headers
    }).then((response) => {
        setProducts(response.data);
    }).catch((error) => {
        setProducts([]);
    });
}
export { getProducts };
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
const requestOptions = {
method: "GET",
headers: myHeaders,
redirect: "follow"
};
fetch("http://localhost:3001/api/inft3050/BookGenre",
requestOptions)
.then((response) => response.text())
.then((result) => console.log(result))
.catch((error) => console.error(error));

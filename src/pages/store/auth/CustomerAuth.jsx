import axios from 'axios'
//API endpoints
const API_PREFIX = "http://localhost:3001/api/inft3050";

//SHA256 password hashing
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
    }
    // Generate a random salt: a 32-character hex string
    const generateSalt = () => {
    const salt = window.crypto.randomUUID().replaceAll("-", "");
    //console.log("Salt: ", salt);
    return salt;
}



const tryLoginUser = (email, password, setUserType) => {
    
    const headers = {
    'Accept': 'application/json',
    };


    //POST credentials to patron
    axios.post(API_PREFIX + "/Login", { email: email, password: password }, {
        headers: headers, withCredentials: true
        }).then((response) => { //Success
            
            console.log(response);
            //Change state variable here
            setUserType("Patron");
            
        }).catch((error) => {
            console.log("Fail");
            console.log(error);
            
            setUserType("Invalid");
        });
}


//Add new user
const tryAddNewUser = (payload, setResult) => {
    const headers = {
        'Accept': 'application/json',
    };
    let newCredentials = {
        Email: payload.email, //Add input fields for these
        Name: payload.customerName,
        Salt: generateSalt(),
        HashPW: ""
    }
    //Create hash of salt and password and POST new user
    sha256(newCredentials.Salt + payload.password).then(hashedPW => {
    newCredentials.HashPW = hashedPW;
    console.log(newCredentials);
    }).then(axios.post(API_PREFIX + "/Patrons", newCredentials,
        { headers: headers, withCredentials: true })
    ).then(response => {
        console.log("Added user successfully");
    setResult("Success");
    }).catch(error => {
        console.error('Error posting data:', error);
    setResult("Fail");
    });
}

export { tryLoginUser, tryAddNewUser };
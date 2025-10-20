import axios from 'axios'
import { useEffect } from 'react';
import validator from 'validator';
import { useState } from 'react';
import { adminLogin } from '../apiClient';
import { api } from '../apiClient';
//API endpoints
const API_PREFIX = "/api/inft3050";

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
const headers = {
        'Accept': 'application/json',
        'xc-auth': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
    };

//Constant time string comparison to prevent timing attacks
function safeEquals(a = "", b = "") {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

const TryLoginUser = async (username, password, setUserType) => {
    if (validator.isEmail(username)) {
            let patrons = [];
            await api.get("/Patrons")
            .then(async (response) => {
                patrons = response.data;
                patrons = Object.values(patrons.list ?? {});
                console.log("Patrons fetched:", patrons);
                console.log("Patrons list:", patrons);
                const patron = patrons.find(p => p.Email === username);
                console.log(patron);
                if (patron) {
                    console.log("Patron found:", patron);
                        const computed = await sha256(String(patron.Salt || "") + String(password || ""));
                        const ok = safeEquals(computed, String(patron.HashPW || ""));
                           if (ok) {
                                console.log("Patron login successful");
                                setUserType("Patron");
                            } else {
                                setUserType("Invalid");
                            }
                }


            }).catch((error) => {
                setUserType("");
                console.error("Error fetching patrons:", error);
            });

            
        }

        else {
            console.log("Attempting admin login for user fetch");
            await adminLogin();
            console.log("Admin logged in for user fetch");    
            let users = [];
            api.get("/User").then(async (response) => {
                users = response.data;
                users = Object.values(users.list ?? {});
                console.log("Users fetched:", users);
                console.log("Users list:", users);
                const user = users.find(p => p.Email === username);
                console.log(user);
                if (user) {
                    console.log("User found:", user);
                        const computed = await sha256(String(user.Salt || "") + String(password || ""));
                        const ok = safeEquals(computed, String(user.HashPW || ""));
                           if (ok) {
                                console.log("User login successful");
                                setUserType("User");
                            } else {
                                setUserType("Invalid");
                            }
                }


            }).catch((error) => {
                setUserType("");
                console.error("Error fetching users:", error);
            });

            
        }
    
}


//Add new user
const tryAddNewUser = async (payload, setResult) => {
  try {
    const newCredentials = {
      Email: payload.email,
      Name: payload.customerName,
      Salt: generateSalt(),
      HashPW: ""
    };

    // wait for hash before posting
    newCredentials.HashPW = await sha256(newCredentials.Salt + payload.password);


    const res = await axios.post(`${API_PREFIX}/Patrons`, newCredentials, {
      headers: headers,
      withCredentials: true 
    });

    console.log("Added user successfully", res.status);
    setResult("Success");
  } catch (err) {
    console.error('Error posting data:', err);
    setResult("Fail");
  }
};


export { TryLoginUser, tryAddNewUser };